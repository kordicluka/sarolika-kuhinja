"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createSectionType(data) {
  try {
    const { title, jsxContent, image } = data;

    if (!title || !jsxContent || !image) {
      return {
        message: "Invalid input - title, image and jsxContent are required.",
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
      data: { title, image, jsxContent: JSON.stringify(jsxContent) },
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

export async function deleteSectionType(id) {
  try {
    await prisma.sectionType.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard/section-types");

    return {
      message: "Deleted section type!",
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting section type:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function updateSectionType(data) {
  try {
    const { id, title, jsxContent, image } = data;

    if (!id || !title || !jsxContent || !image) {
      return {
        message: "Invalid input - id, title, and jsxContent are required.",
        ok: false,
      };
    }

    const existingSectionType = await prisma.sectionType.findUnique({
      where: { id },
    });

    if (!existingSectionType) {
      return {
        message: "Section type does not exist!",
        ok: false,
      };
    }

    const sectionType = await prisma.sectionType.update({
      where: { id },
      data: { title, image, jsxContent: JSON.stringify(jsxContent) },
    });

    revalidatePath("/dashboard/section-types");

    return {
      message: "Updated section type!",
      sectionType,
      ok: true,
    };
  } catch (error) {
    console.error("Error updating section type:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getSectionTypes() {
  try {
    const sectionTypes = await prisma.sectionType.findMany();

    return {
      sectionTypes: sectionTypes.map((type) => ({
        ...type,
        jsxContent: JSON.parse(type.jsxContent),
      })),
      message: "Got section types!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting section types:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getSectionType(id) {
  try {
    const sectionType = await prisma.sectionType.findUnique({
      where: { id },
    });

    if (!sectionType) {
      return {
        message: "Section type not found!",
        ok: false,
      };
    }

    return {
      sectionType: {
        ...sectionType,
        jsxContent: JSON.parse(sectionType.jsxContent),
      },
      message: "Got section type!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting section type:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
