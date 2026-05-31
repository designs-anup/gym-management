import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendGymMail }
from "./sendMail.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post(
  "/send-email",
  async (req, res) => {
    try {
      await sendGymMail(
        req.body
      );

      res.json({
        success: true,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error:
          err.message,
      });
    }
  }
);

app.listen(5000, () =>
  console.log(
    "Server running on 5000"
  )
);