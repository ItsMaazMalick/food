"use server";
import nodemailer from "nodemailer";
import { generateOTP } from "./generateOTP";
export const sendOTP = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const OTP = generateOTP(6);

  const mailOptions = {
    from: `GYROS'N MORE ${process.env.SMTP_EMAIL}`,
    to: email,
    subject: "OTP Verification",
    html: `<div>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Please use the following One Time Password (OTP) to access the form: <strong>${OTP}</strong>. Do not share this OTP with any one.<br><br>
        Thank you!</p>
        </div>`,
  };

  const sendMail = await transporter.sendMail(mailOptions);
  if (!sendMail) {
    return {
      status: 401,
      success: false,
      message: "Something went wrong",
    };
  }
  return {
    status: 200,
    success: true,
    OTP,
  };
};
