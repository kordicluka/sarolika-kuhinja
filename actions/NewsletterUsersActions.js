"use server";
import prisma from "@/utils/db";
import { randomBytes } from "crypto";
import { addMinutes, isBefore } from "date-fns";
import { sendVerificationEmail } from "@/utils/email";

async function generateVerificationToken(email) {
  const token = randomBytes(32).toString("hex");
  const expires = addMinutes(new Date(), 5); // Token expires in 5 minutes

  await prisma.newsletterVerificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return token;
}

export async function createNewsletterUser(data) {
  try {
    const { email, name } = data;

    if (!email) {
      return { message: "Email je obavezan.", ok: false };
    }

    if (!name) {
      return { message: "Ime je obavezno.", ok: false };
    }

    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token);

    return {
      message: "Verifikacijski email je poslan!",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri stvaranju korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function verifyNewsletterUser(token) {
  try {
    const verificationToken =
      await prisma.newsletterVerificationToken.findUnique({
        where: { token },
      });

    if (
      !verificationToken ||
      isBefore(new Date(verificationToken.expires), new Date())
    ) {
      return { message: "Token je nevažeći ili je istekao.", ok: false };
    }

    const user = await prisma.newsletterUsers.create({
      data: {
        email: verificationToken.email,
        isVerified: true,
      },
    });

    await prisma.newsletterVerificationToken.delete({
      where: { token },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      message: "Korisnik newslettera je uspješno verificiran!",
      user,
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri verifikaciji korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}
