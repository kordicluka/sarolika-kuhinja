"use server";
import { hashPassword } from "@/utils/auth";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createUser(data) {
  try {
    const { name, email, password, image } = data; // Parse the request body

    if (!email) {
      return { message: "E-mail je obavezan.", ok: false };
    }

    if (!email.includes("@")) {
      return { message: "E-mail mora sadržavati '@'.", ok: false };
    }

    if (!password) {
      return { message: "Lozinka je obavezna.", ok: false };
    }

    if (password.trim().length < 6) {
      return {
        message: "Lozinka mora biti duga najmanje 6 znakova.",
        ok: false,
      };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { message: "Korisnik već postoji!", ok: false };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, name, hashedPassword, role: "ADMIN", image },
    });

    return {
      message: "Korisnik je uspješno stvoren!",
      user,
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri stvaranju korisnika:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function deleteUser(id) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return { message: "Korisnik nije pronađen!", ok: false };
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/auth");

    return {
      message: "Korisnik je uspješno izbrisan!",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri brisanju korisnika:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function editUser(id, data) {
  // Remove fields that are not valid for update
  const { password, createdAt, updatedAt, ...validData } = data;

  if (!id) {
    return { message: "ID korisnika je obavezan.", ok: false };
  }

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return { message: "Korisnik ne postoji!", ok: false };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: validData,
    });

    revalidatePath("/dashboard/auth/" + id);

    return {
      message: "Korisnik je uspješno ažuriran!",
      user: updatedUser,
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri ažuriranju korisnika:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}

export async function getUser(id) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      return { message: "Korisnik nije pronađen!", ok: false };
    }

    return {
      user,
      message: "Korisnik je uspješno pronađen!",
      ok: true,
    };
  } catch (error) {
    console.error("Greška pri dobivanju korisnika:", error);
    return {
      message: "Interna greška poslužitelja.",
      ok: false,
    };
  }
}
