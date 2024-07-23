import nodemailer from 'nodemailer'
import { baseUrl } from './baseUrl'

const transporter = nodemailer.createTransport({
  // EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_TLS are environment variables
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_TLS === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function sendVerificationEmail(email, token) {
  const verificationUrl = `http://${baseUrl}/newsletter/verify-email?token=${token}`

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify your email',
    text: `Click the following link to verify your email: ${verificationUrl}`,
    html: `<p>Click the following link to verify your email: <a href="${verificationUrl}">Verify Email</a></p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Verification email sent to ${email}`)
  } catch (error) {
    console.error('Error sending verification email:', error)
    throw new Error('Could not send verification email')
  }
}
