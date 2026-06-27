import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({
  path: new URL("../.env", import.meta.url).pathname,
});

const emailUser =
  process.env.EMAIL_USER ||
  process.env.VITE_EMAIL_USER;
const emailPass =
  process.env.EMAIL_PASS ||
  process.env.VITE_EMAIL_PASS;

if (!emailUser || !emailPass) {
  throw new Error(
    "Missing email credentials: set EMAIL_USER/EMAIL_PASS or VITE_EMAIL_USER/VITE_EMAIL_PASS"
  );
}

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

export const sendGymMail =
  async ({
    email,
    owner_name,
    password,
  }) => {
    console.log(
      `Sending gym email to ${email} for ${owner_name}`
    );

    const result = await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: "Gym SaaS Login Credentials",
      html: `
        <h2>Welcome to Gym SaaS</h2>
        <p>Hello ${owner_name}</p>
        <p>Your account is ready.</p>
        <p>Email: ${email}</p>
        <p>Password: ${password}</p>
      `,
    });

    console.log(
      "Email sent successfully:",
      result.messageId
    );

    return result;
  };