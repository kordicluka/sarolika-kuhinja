import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(email, token) {
  const verificationUrl = `https://yourdomain.com/verify?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    text: `Click the following link to verify your email: ${verificationUrl}`,
    html: `<p>Click the following link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Could not send verification email");
  }
}
