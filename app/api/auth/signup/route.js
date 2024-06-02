import prisma from "@/utils/db";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password, name } = await request.json();

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
