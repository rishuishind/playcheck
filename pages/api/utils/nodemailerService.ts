import nodemailer from "nodemailer";

export const senderEmail = process.env.NEXT_PUBLIC_NODEMAILER_EMAIL;
const password = process.env.NEXT_PUBLIC_NODEMAILER_PW;

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: password,
  },
});
