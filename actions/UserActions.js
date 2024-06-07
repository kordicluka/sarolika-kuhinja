// actions/UserActions.js:
"use server";
import { hashPassword } from "@/utils/auth";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createUser(data) {
  try {
    const { name, email, password, image } = data; // Parse the request body

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6
    ) {
      return {
        message:
          "Invalid input - password should be at least 6 characters long and email should be valid.",
        ok: false,
      };
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        message: "User already exists!",
        ok: false,
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, name, hashedPassword, role: "ADMIN", image },
    });

    return {
      message: "Created user!",
      user,
      ok: true,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

// make the delete function
export async function deleteUser(id) {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/auth");

    return {
      message: "User deleted!",
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function editUser(id, data) {
  // Remove fields that are not valid for update
  const { password, createdAt, updatedAt, ...validData } = data;

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...validData,
      },
    });

    revalidatePath("/dashboard/auth/ " + id);

    return {
      message: "User updated!",
      user,
      ok: true,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getUser(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      return {
        message: "User not found!",
        ok: false,
      };
    }

    return {
      user,
      message: "User found!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting user:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
