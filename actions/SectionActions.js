"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createSection(data) {
  try {
    const {
      title,
      subtitle,
      description,
      images,
      sectionTypeId,
      jsxContent,
      postId,
      mealId,
      workshopId,
    } = data;

    if (
      !title ||
      !subtitle ||
      !description ||
      !images ||
      !sectionTypeId ||
      !jsxContent
    ) {
      return {
        message:
          "Invalid input - title, subtitle, description, images, sectionTypeId, and jsxContent are required.",
        ok: false,
      };
    }

    const section = await prisma.section.create({
      data: {
        title,
        subtitle,
        description,
        images: JSON.stringify(images),
        sectionTypeId,
        jsxContent: JSON.stringify(jsxContent),
        postId,
        mealId,
        workshopId,
      },
    });

    revalidatePath("/dashboard/sections");

    return {
      message: "Created section!",
      section,
      ok: true,
    };
  } catch (error) {
    console.error("Error creating section:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function deleteSection(id) {
  try {
    await prisma.section.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/sections");

    return {
      message: "Deleted section!",
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting section:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function updateSection(data) {
  try {
    const {
      id,
      title,
      subtitle,
      description,
      images,
      sectionTypeId,
      jsxContent,
      postId,
      mealId,
      workshopId,
    } = data;

    if (
      !id ||
      !title ||
      !subtitle ||
      !description ||
      !images ||
      !sectionTypeId ||
      !jsxContent
    ) {
      return {
        message:
          "Invalid input - id, title, subtitle, description, images, sectionTypeId, and jsxContent are required.",
        ok: false,
      };
    }

    const existingSection = await prisma.section.findUnique({
      where: { id },
    });

    if (!existingSection) {
      return {
        message: "Section does not exist!",
        ok: false,
      };
    }

    const section = await prisma.section.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        images: JSON.stringify(images),
        sectionTypeId,
        jsxContent: JSON.stringify(jsxContent),
        postId,
        mealId,
        workshopId,
      },
    });

    revalidatePath("/dashboard/sections");

    return {
      message: "Updated section!",
      section,
      ok: true,
    };
  } catch (error) {
    console.error("Error updating section:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getSections() {
  try {
    const sections = await prisma.section.findMany();

    return {
      sections,
      message: "Got sections!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting sections:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getSection(id) {
  try {
    const section = await prisma.section.findUnique({
      where: { id },
    });

    if (!section) {
      return {
        message: "Section not found!",
        ok: false,
      };
    }

    return {
      section,
      message: "Got section!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting section:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
