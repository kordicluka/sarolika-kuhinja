"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/utils/slug";
import { join } from "path";
import { unlink } from "fs/promises";

export async function createMeal(data) {
  const session = await getServerSession(authOptions);

  try {
    const { title, slug, description, isVisible, sections, image } = data;

    if (
      !title ||
      !description ||
      typeof isVisible !== "boolean" ||
      !sections ||
      !image
    ) {
      return {
        message:
          "Invalid input - title, image, description, isVisible, and sections are required.",
        ok: false,
      };
    }

    const finalSlug = slug || generateSlug(title);

    const meal = await prisma.meal.create({
      data: {
        title,
        slug: finalSlug,
        description,
        isVisible,
        image,
        sections: JSON.stringify(sections),
        createdById: session.user.id,
        lastEditedById: session.user.id,
      },
    });

    revalidatePath("/dashboard/jela");

    return {
      message: "Created Meal!",
      meal,
      ok: true,
    };
  } catch (error) {
    console.error("Error creating Meal:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function deleteMeal(id) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id },
    });

    if (meal.image) {
      const key = meal.image;
      const path = join(process.cwd(), "public", "uploads", key);

      try {
        await unlink(path);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }

    await prisma.meal.delete({
      where: { id: id },
    });

    revalidatePath("/dashboard/jela");

    return {
      message: "Deleted Meal!",
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting Meal:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function updateMeal(data) {
  const session = await getServerSession(authOptions);
  try {
    const { id, image, title, slug, description, isVisible, sections } = data;

    if (!title || !description || typeof isVisible !== "boolean" || !image) {
      return {
        message:
          "Invalid input - id, title, image, slug, description, isVisible, sections are required.",
        ok: false,
      };
    }

    const existingMeal = await prisma.meal.findUnique({
      where: { id },
    });

    if (!existingMeal) {
      return {
        message: "Meal does not exist!",
        ok: false,
      };
    }

    const meal = await prisma.meal.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        isVisible,
        image,
        sections: JSON.stringify(sections),
        lastEditedById: session.user.id,
      },
    });

    revalidatePath("/dashboard/jela");

    return {
      message: "Updated Meal!",
      meal,
      ok: true,
    };
  } catch (error) {
    console.error("Error updating Meal:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getMeals() {
  try {
    const meals = await prisma.meal.findMany();

    return {
      meals: meals.map((meal) => ({
        ...meal,
        sections: JSON.parse(meal.sections),
      })),
      message: "Got Meals!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting Meals:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getMeal(id) {
  try {
    const meal = await prisma.Meal.findUnique({
      where: { id },
    });

    if (!meal) {
      return {
        message: "Meal not found!",
        ok: false,
      };
    }

    return {
      meal: {
        ...meal,
        sections: JSON.parse(meal.sections),
      },
      message: "Got Meal!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting Meal:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function toggleMealVisibility(id) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id },
    });

    if (!meal) {
      return {
        message: "Meal not found!",
        ok: false,
      };
    }

    const isVisible = !meal.isVisible;

    await prisma.meal.update({
      where: { id },
      data: {
        isVisible,
      },
    });

    revalidatePath("/dashboard/jela");

    return {
      message: "Toggled Meal visibility!",
      ok: true,
    };
  } catch (error) {
    console.error("Error toggling Meal visibility:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
