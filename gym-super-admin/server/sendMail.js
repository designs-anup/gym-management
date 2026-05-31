import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:
        process.env.EMAIL_USER,
      pass:
        process.env.EMAIL_PASS,
    },
  });

export const sendGymMail =
  async ({
    email,
    owner_name,
    password,
  }) => {
    return transporter.sendMail({
      from:
        process.env.EMAIL_USER,
      to: email,
      subject:
        "Gym SaaS Login Credentials",

      html: `
        <h2>Welcome to Gym SaaS</h2>

        <p>Hello ${owner_name}</p>

        <p>Your account is ready.</p>

        <p>Email: ${email}</p>
        <p>Password: ${password}</p>
      `,
    });
  };