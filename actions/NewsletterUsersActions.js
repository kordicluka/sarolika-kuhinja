"use server";
import prisma from "@/utils/db";
import { randomBytes } from "crypto";
import { addMinutes, isBefore } from "date-fns";
import { sendVerificationEmail } from "@/utils/email";
import { revalidatePath } from "next/cache";

async function generateVerificationToken(email) {
  const token = randomBytes(32).toString("hex");
  const expires = addMinutes(new Date(), 60);

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

    // Check if the user already exists
    const existingUser = await prisma.newsletterUsers.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.isVerified) {
      return {
        message: "Korisnik s ovim mail-om je već kreiran.",
        ok: false,
      };
    }

    // Create the user with isVerified set to false
    await prisma.newsletterUsers.create({
      data: {
        email,
        name,
        isVerified: false,
      },
    });

    const token = await generateVerificationToken(email);
    await sendVerificationEmail(email, token);

    return {
      message:
        "Na vašu email adresu poslana je verifikacijska poruka s kojom morate potvrditi pretplatu na newsletter.",
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
    if (!token) {
      return { message: "Token je obavezan.", ok: false };
    }

    const verificationToken =
      await prisma.newsletterVerificationToken.findUnique({
        where: { token },
      });

    console.log("Verification token found:", verificationToken);

    if (!verificationToken) {
      console.error("Token not found:", token);
      return { message: "Token nije pronađen.", ok: false };
    }

    if (isBefore(new Date(verificationToken.expires), new Date())) {
      return { message: "Token je nevažeći ili je istekao.", ok: false };
    }

    const user = await prisma.newsletterUsers.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) {
      return { message: "Korisnik nije pronađen.", ok: false };
    }

    // Update the user to set isVerified to true
    await prisma.newsletterUsers.update({
      where: { email: verificationToken.email },
      data: { isVerified: true },
    });

    await prisma.newsletterVerificationToken.delete({
      where: { token },
    });

    return {
      message: "Korisnik newslettera je uspješno verificiran!",
      user,
      ok: true,
      email: user.email,
    };
  } catch (error) {
    console.error("Greška pri verifikaciji korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function signOutNewsletterUser(email) {
  try {
    const user = await prisma.newsletterUsers.findUnique({
      where: { email },
    });

    if (!user) {
      return { message: "Korisnik nije pronađen.", ok: false };
    }

    await prisma.newsletterUsers.delete({
      where: { email },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      message: "Uspješno ste se odjavili s newslettera.",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri odjavi s newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}
