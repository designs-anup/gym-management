import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(
  import.meta.env.VITE_RESEND_API_KEY
);

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
    const password = generatePassword();

    // 1. Create auth user
    const {
      data: authData,
      error: authError,
    } = await supabase.auth.admin.createUser({
      email: gymData.email,
      password,
      email_confirm: true,
    });

    if (authError) throw authError;

    const userId = authData.user.id;

    // 2. Create gym
    const {
      data: gym,
      error: gymError,
    } = await supabase
      .from("gyms")
      .insert([
        {
          gym_name: gymData.gym_name,
          owner_name: gymData.owner_name,
          email: gymData.email,
          phone: gymData.phone,
          city: gymData.city,
          subscription_plan: "basic",
        },
      ])
      .select()
      .single();

    if (gymError) throw gymError;

    // 3. Create user record
    const { error: userError } =
      await supabase
        .from("users")
        .insert([
          {
            id: userId,
            gym_id: gym.id,
            full_name:
              gymData.owner_name,
            email: gymData.email,
            role: "gym owner",
            is_active: true,
          },
        ]);

    if (userError) throw userError;

    // 4. Send login email
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: gymData.email,
      subject:
        "Gym SaaS Login Credentials",
      html: `
        <h2>Welcome to Gym SaaS</h2>
        <p>Hello ${gymData.owner_name}</p>

        <p>Your gym account has been created.</p>

        <p><strong>Email:</strong> ${gymData.email}</p>
        <p><strong>Password:</strong> ${password}</p>

        <p>Please login and change your password.</p>
      `,
    });

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err.message,
    };
  }
};