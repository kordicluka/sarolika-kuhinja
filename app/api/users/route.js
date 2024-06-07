import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/auth";

// fetch the user data from the database
export async function getUsers() {
  const users = await prisma.user.findMany();
  return NextResponse.json({
    status: 200,
    message: "Korisnici uspješno dohvaćeni.",
    users: users,
  });
}

export async function createUser({ email, password, name }) {
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 6
  ) {
    return NextResponse.json({
      status: 422,
      body: {
        message:
          "Invalid input - password should be at least 6 characters long and email should be valid.",
      },
    });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({
      status: 409,
      body: { message: "User already exists!" },
    });
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, name, hashedPassword, role: "ADMIN" },
  });

  return NextResponse.json({
    status: 200,
    body: { message: "Created user!", user },
  }).redirect("/dashboard/auth/signin");
}

export async function deleteUser(id) {
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Korisnik uspješno obrisan.",
  });
}

export async function updateUser(id, data) {
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Korisnik uspješno ažuriran.",
    user: user,
  });
}
