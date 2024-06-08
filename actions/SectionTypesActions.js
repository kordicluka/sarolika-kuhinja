"use server";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export async function createSectionType(data) {
  try {
    const { title, maxImages } = data;

    if (!title || !maxImages) {
      return {
        message: "Invalid input - title and maxImages are required.",
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
      data: { title, maxImages },
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
    const { id, title, maxImages } = data;

    if (!id || !title || !maxImages) {
      return {
        message: "Invalid input - id, title, and maxImages are required.",
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
      data: { title, maxImages },
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
      sectionTypes,
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
      sectionType,
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
        images,
        sectionTypeId,
        jsxContent,
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
        images,
        sectionTypeId,
        jsxContent,
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
