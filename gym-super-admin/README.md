# Gym Super Admin

This folder contains the React + Vite admin panel for the Gym Management application.

## Environment Variables

Create a `.env` file in the `gym-super-admin` folder and add these values:

- `VITE_SUPABASE_URL` – Supabase project URL
- `VITE_SUPABASE_ANON_KEY` – Supabase anon key
- `VITE_SUPABASE_SERVICE_ROLE_KEY` – Supabase service role key
- `VITE_EMAIL_USER` – SMTP email address used for sending credentials
- `VITE_EMAIL_PASS` – SMTP password for the email account
- `VITE_API_BASE_URL` – URL for the backend API, e.g. `http://localhost:5000`

## Running the app

1. Start the backend server:

```bash
cd gym-super-admin/server
node index.js
```

2. Start the frontend app:

```bash
cd gym-super-admin
npm run dev
```

## Email flow

The app sends credential emails through the backend endpoint at `${VITE_API_BASE_URL}/send-email`.
The backend loads SMTP credentials from `.env` and uses `nodemailer` to send email.
