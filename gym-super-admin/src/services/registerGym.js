import { supabase } from "../lib/supabase";
import { Resend } from "resend";

const generatePassword = () => {
  return (
    "Gym@" +
    Math.random().toString(36).slice(-6)
  );
};

export const registerGym = async (
  gymData
) => {
  try {
    const resend = new Resend(
      import.meta.env.VITE_RESEND_API_KEY
    );

    const password = generatePassword();

    // your logic here
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: err.message,
    };
  }
};

console.log(
  "RESEND KEY:",
  import.meta.env.VITE_RESEND_API_KEY
);

console.log(import.meta.env.VITE_SUPABASE_URL);
console.log(import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY);
console.log(import.meta.env.VITE_RESEND_API_KEY);