import { createClient } from "@supabase/supabase-js";
import { getApiUrl } from "../lib/api";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
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
    const { data: existingUser } =
      await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

    if (!existingUser) {
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

      if (userError)
        throw userError;
    }

    // 4. Send login email
    const url = getApiUrl("/send-email");

    try {
      console.log(
        "Register email request url:",
        url,
        "host:",
        window.location.hostname
      );
      const response =
        await fetch(
          url,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email:
                gymData.email,

              owner_name:
                gymData.owner_name,

              password,
            }),
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            JSON.stringify(result) ||
            "Unable to send email"
        );
      }

      if (result.success === false) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to send email"
        );
      }

      console.log(
        "EMAIL RESULT:",
        result
      );
    } catch (error) {
      console.error(
        "EMAIL FAILED:",
        error
      );
      throw error;
    }

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