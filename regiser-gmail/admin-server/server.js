const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase Client using the service_role key for admin privileges
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/api/register', async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // 1. Check if the user already exists in the database
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: 'A user with this email already exists.' });
  }

  // 2. Save the user to the Supabase database
  const { data: newUser, error: dbError } = await supabase
    .from('users')
    .insert([{ name, email, role }])
    .select()
    .single();

  if (dbError) {
    console.error('Supabase DB Error:', dbError);
    return res.status(500).json({ message: 'Failed to save user to the database.' });
  }

  // 3. Generate temporary password for the onboarding email
  const temporaryPassword = Math.random().toString(36).slice(-8);

  const mailOptions = {
    from: `"Super Admin" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Welcome to the Platform - Your Account Details',
    html: `
      <h2>Hello ${name},</h2>
      <p>A Super Admin has registered you onto our platform as a <strong>${role}</strong>.</p>
      <p>Here are your login credentials:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Temporary Password:</strong> ${temporaryPassword}</li>
      </ul>
      <p>Please change your password upon your first login.</p>
      <br />
      <p>Best regards,<br>Management Team</p>
    `,
  };

  try {
    // 4. Send the email
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: `User ${name} successfully saved to database and welcome email sent.` 
    });
  } catch (error) {
    console.error('Email error:', error);
    // Note: User is saved in DB, but email failed. In production, you might want to handle rollbacks.
    res.status(500).json({ message: 'User saved, but failed to send registration email.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));