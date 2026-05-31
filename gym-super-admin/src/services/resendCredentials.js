export const resendCredentials =
  async (gym) => {
    try {
      const response =
        await fetch(
          "http://localhost:5000/send-email",
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

      if (!response.ok) {
        throw new Error(
          result.message
        );
      }

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  };