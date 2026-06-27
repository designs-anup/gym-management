import { getApiUrl } from "../lib/api";

export const resendCredentials =
  async (gym) => {
    try {
      const url = getApiUrl("/send-email");

      console.log(
        "Resend email request url:",
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

            body:
              JSON.stringify({
                email:
                  gym.email,

                owner_name:
                  gym.owner_name,

                password:
                  "ResetPassword123",
              }),
          }
        );

      const result =
        await response.json();

      console.log(
        "RESEND EMAIL RESPONSE:",
        response.status,
        result
      );

      if (!response.ok) {
        throw new Error(
          result.error ||
            result.message ||
            JSON.stringify(result) ||
            "Unable to resend email"
        );
      }

      if (result.success === false) {
        throw new Error(
          result.error ||
            result.message ||
            "Unable to resend email"
        );
      }

      return {
        success: true,
      };
    } catch (err) {
      console.error("RESEND EMAIL FAILED:", err);
      return {
        success: false,
        error: err.message,
      };
    }
  };