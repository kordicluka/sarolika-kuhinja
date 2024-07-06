"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/utils/slug";
import { join } from "path";
import { unlink } from "fs/promises";

export async function createWorkshop(data) {
  const session = await getServerSession(authOptions);

  console.log("data", data);

  try {
    const {
      title,
      slug,
      description,
      isVisible,
      sections,
      image,
      date,
      maxApplicant,
    } = data;

    if (
      !title ||
      !description ||
      typeof isVisible !== "boolean" ||
      !sections ||
      !image ||
      !date ||
      !maxApplicant
    ) {
      return {
        message:
          "Invalid input - title, image, description, isVisible, sections, maxApplicant and date are required.",
        ok: false,
      };
    }

    const finalSlug = slug || generateSlug(title);

    const workshop = await prisma.workshop.create({
      data: {
        title,
        slug: finalSlug,
        description,
        isVisible,
        image,
        date,
        maxApplicant,
        sections: JSON.stringify(sections),
        createdById: session.user.id,
        lastEditedById: session.user.id,
      },
    });

    revalidatePath("/dashboard/radionice");

    return {
      message: "Created workshop!",
      workshop,
      ok: true,
    };
  } catch (error) {
    console.error("Error creating workshop:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function deleteWorkshop(id) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    });

    if (workshop.image) {
      const key = workshop.image;
      const path = join(process.cwd(), "public", "uploads", key);

      try {
        await unlink(path);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }

    await prisma.workshop.delete({
      where: { id: id },
    });

    revalidatePath("/dashboard/radionice");

    return {
      message: "Deleted workshop!",
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting workshop:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function updateWorkshop(data) {
  const session = await getServerSession(authOptions);
  try {
    const {
      id,
      image,
      title,
      slug,
      description,
      isVisible,
      sections,
      date,
      maxApplicant,
    } = data;

    if (!title || !description || typeof isVisible !== "boolean" || !image) {
      return {
        message:
          "Invalid input - title, image, description, and isVisible are required.",
        ok: false,
      };
    }

    const existingWorkshop = await prisma.workshop.findUnique({
      where: { id },
    });

    if (!existingWorkshop) {
      return {
        message: "Workshop does not exist!",
        ok: false,
      };
    }

    const workshop = await prisma.workshop.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        isVisible,
        image,
        date,
        maxApplicant,
        sections: JSON.stringify(sections),
        lastEditedById: session.user.id,
      },
    });

    revalidatePath("/dashboard/radionice");

    return {
      message: "Updated workshop!",
      workshop,
      ok: true,
    };
  } catch (error) {
    console.error("Error updating workshop:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getWorkshops() {
  try {
    const workshops = await prisma.workshop.findMany();

    return {
      workshops: workshops.map((workshop) => ({
        ...workshop,
        sections: JSON.parse(workshop.sections),
      })),
      message: "Got workshops!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting workshops:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getWorkshop(id) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    });

    if (!workshop) {
      return {
        message: "Workshop not found!",
        ok: false,
      };
    }

    return {
      workshop: {
        ...workshop,
        sections: JSON.parse(workshop.sections),
      },
      message: "Got workshop!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting workshop:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function toggleWorkshopVisibility(id) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    });

    if (!workshop) {
      return {
        message: "Workshop not found!",
        ok: false,
      };
    }

    const isVisible = !workshop.isVisible;

    await prisma.workshop.update({
      where: { id },
      data: {
        isVisible,
      },
    });

    revalidatePath("/dashboard/radionice");

    return {
      message: "Toggled workshop visibility!",
      ok: true,
    };
  } catch (error) {
    console.error("Error toggling workshop visibility:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
