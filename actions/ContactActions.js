"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_TLS === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendContactFormEmail(data) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send email to yourself
    subject: `Nova prijava s kontakt forme od ${data.name}`,
    text: `
      Primili ste novu poruku s vaše kontakt forme na web stranici.

      Detalji su sljedeći:
      
      Ime i prezime: ${data.name}
      Email: ${data.email}
      Telefon: ${data.phone}
      Poruka: ${data.message}
    `,
    html: `
      <p>Primili ste novu poruku s vaše kontakt forme na web stranici.</p>
      <p><strong>Ime i prezime:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Telefon:</strong> ${data.phone}</p>
      <p><strong>Poruka:</strong><br/>${data.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email s kontakt forme poslan od ${data.email}`);
    return { message: "Email je uspješno poslan!", ok: true };
  } catch (error) {
    console.error("Greška pri slanju emaila s kontakt forme:", error);
    return { message: "Interna greška poslužitelja.", ok: false };
  }
}
