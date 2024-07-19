"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createNewsletterUser(data) {
  try {
    const { email, name } = data;

    if (!email) {
      return { message: "Email je obavezan.", ok: false };
    }

    if (!name) {
      return { message: "Ime je obavezno.", ok: false };
    }

    const user = await prisma.newsletterUsers.create({
      data: {
        email,
        name,
        isVerified: false,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      message: "Korisnik newslettera je uspješno stvoren!",
      user,
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

export async function deleteNewsletterUser(id) {
  try {
    const user = await prisma.newsletterUsers.findUnique({
      where: { id },
    });

    if (!user) {
      return { message: "Korisnik newslettera nije pronađen!", ok: false };
    }

    await prisma.newsletterUsers.delete({
      where: { id: id },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      message: "Korisnik newslettera je uspješno izbrisan!",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri brisanju korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function updateNewsletterUser(data) {
  try {
    const { id, email, name, isVerified } = data;

    if (!id) {
      return { message: "ID korisnika je obavezan.", ok: false };
    }

    if (!email) {
      return { message: "Email je obavezan.", ok: false };
    }

    if (!name) {
      return { message: "Ime je obavezno.", ok: false };
    }

    const existingUser = await prisma.newsletterUsers.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return { message: "Korisnik newslettera ne postoji!", ok: false };
    }

    const user = await prisma.newsletterUsers.update({
      where: { id },
      data: {
        email,
        name,
        isVerified: isVerified ?? existingUser.isVerified,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      message: "Korisnik newslettera je uspješno ažuriran!",
      user,
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri ažuriranju korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function getNewsletterUsers() {
  try {
    const users = await prisma.newsletterUsers.findMany();

    return {
      users,
      message: "Korisnici newslettera su uspješno dobiveni!",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri dobivanju korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function getNewsletterUser(id) {
  try {
    const user = await prisma.newsletterUsers.findUnique({
      where: { id },
    });

    if (!user) {
      return { message: "Korisnik newslettera nije pronađen!", ok: false };
    }

    return {
      user,
      message: "Korisnik newslettera je uspješno dobiven!",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri dobivanju korisnika newslettera:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function verifyNewsletterUser(id) {
  try {
    const user = await prisma.newsletterUsers.findUnique({
      where: { id },
    });

    if (!user) {
      return { message: "Korisnik newslettera nije pronađen!", ok: false };
    }

    const isVerified = !user.isVerified;

    await prisma.newsletterUsers.update({
      where: { id },
      data: {
        isVerified,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      message: "Verifikacija korisnika newslettera je uspješno promijenjena!",
      ok: true,
    };
  } catch (error) {
    console.error(
      "Greška pri promjeni verifikacije korisnika newslettera:",
      error
    );
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}
