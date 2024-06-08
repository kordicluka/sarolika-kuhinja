// actions/UserActions.js:
"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createSectionType(data) {
  try {
    const { title, html, maxImages } = data;

    if (!title || !html || !maxImages) {
      return {
        message: "Invalid input - title, html, and maxImages are required.",
        ok: false,
      };
    }

    const existingSectionType = await prisma.sectionType.findUnique({
      where: { title },
    });

    if (existingSectionType) {
      return {
        message: "Section type already exists!",
        ok: false,
      };
    }

    const sectionType = await prisma.sectionType.create({
      data: { title, html, maxImages },
    });

    revalidatePath("/dashboard/section-types");

    return {
      message: "Created section type!",
      sectionType,
      ok: true,
    };
  } catch (error) {
    console.error("Error creating section type:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
