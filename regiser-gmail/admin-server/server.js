const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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

  // Generate a temporary random password for the new user
  const temporaryPassword = Math.random().toString(36).slice(-8);

  // Email template configuration
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
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Success response (In a real app, you would save user details to a DB here)
    res.status(200).json({ 
      success: true, 
      message: `User ${name} registered and welcome email sent successfully.` 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send registration email.' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));