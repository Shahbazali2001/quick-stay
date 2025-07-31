import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer error:", error);
  } else {
    console.log("Nodemailer transporter ready ✅");
  }
});


export default transporter;