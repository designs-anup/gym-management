const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Client with the Service Role Key
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// GET Route: Fetch all profiles from public table
app.get('/api/users', async (req, res) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ message: error.message });
  res.status(200).json(data);
});

// POST Route: Admin registers user to Auth & Public Profiles
app.post('/api/register', async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Generate a random temporary password for them
  const temporaryPassword = Math.random().toString(36).slice(-10) + 'A1!';

  try {
    // 1. Create the user inside Supabase Auth system using admin privileges
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: temporaryPassword,
      email_confirm: true // Auto-confirms their email address
    });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    // 2. Insert user profile metadata into your public table using the exact generated Auth ID
    const { error: dbError } = await supabase
      .from('users')
      .insert([{ 
        id: authUser.user.id, // Linking public table profile to Auth ID
        name, 
        email, 
        role 
      }]);

    if (dbError) {
      // Rollback: If profile table insert fails, delete the authentication profile
      await supabase.auth.admin.deleteUser(authUser.user.id);
      return res.status(500).json({ message: 'Database profile sync failed.' });
    }

    // 3. Email the generated temporary credentials to the user via Gmail SMTP
    const mailOptions = {
      from: `"Gym Network Admin" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your Gym Management System Account Login Credentials',
      html: `
        <h3>Welcome to the Team, ${name}!</h3>
        <p>Your administration supervisor has assigned you the role of <strong>${role}</strong>.</p>
        <p>Use these credentials to log in to your dashboard portal:</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; font-family: monospace;">
          <strong>Portal Email:</strong> ${email}<br/>
          <strong>Temporary Password:</strong> ${temporaryPassword}
        </div>
        <p style="color: #d9534f;">*Note: You will be prompted to reset this temporary password upon your first entry.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: `Account created for ${name}. Notification email dispatched.` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal processing error occurred.' });
  }
});

// NEW POST Route: Standard User Login authentication handler
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ message: error.message });
  }

  // Fetch the user's role AND their first login status
  const { data: profile } = await supabase
    .from('users')
    .select('name, role, is_first_login')
    .eq('id', data.user.id)
    .single();

  res.status(200).json({
    message: 'Login authenticated successfully.',
    session: data.session,
    user: {
      id: data.user.id,
      name: profile?.name || 'User',
      role: profile?.role || 'Member',
      email: data.user.email,
      isFirstLogin: profile?.is_first_login ?? true // Send flag to frontend
    }
  });
});

// POST Route: Update temporary password to a permanent one
app.post('/api/update-password', async (req, res) => {
  const { userId, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ message: 'Missing required update payloads.' });
  }

  try {
    // 1. Update the password securely inside Supabase Auth
    const { error: authError } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword
    });

    if (authError) return res.status(400).json({ message: authError.message });

    // 2. Flip the is_first_login flag to false in our public users table
    const { error: dbError } = await supabase
      .from('users')
      .update({ is_first_login: false })
      .eq('id', userId);

    if (dbError) return res.status(500).json({ message: 'Profile state synchronization failed.' });

    res.status(200).json({ success: true, message: 'Password updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error during update.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running securely on port ${PORT}`));