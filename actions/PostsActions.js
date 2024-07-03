"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/utils/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/utils/slug";
import { join } from "path";
import { unlink } from "fs/promises";

export async function createPost(data) {
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

    const post = await prisma.post.create({
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

    revalidatePath("/dashboard/posts");

    return {
      message: "Created post!",
      post,
      ok: true,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function deletePost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.image) {
      const key = post.image;
      const path = join(process.cwd(), "public", "uploads", key);

      try {
        await unlink(path);
      } catch (error) {
        console.error("Error deleting file:", error);
      }
    }

    await prisma.post.delete({
      where: { id: id },
    });

    revalidatePath("/dashboard/posts");

    return {
      message: "Deleted post!",
      ok: true,
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function updatePost(data) {
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

    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return {
        message: "Post does not exist!",
        ok: false,
      };
    }

    const post = await prisma.post.update({
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

    revalidatePath("/dashboard/posts");

    return {
      message: "Updated post!",
      post,
      ok: true,
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany();

    return {
      posts: posts.map((post) => ({
        ...post,
        sections: JSON.parse(post.sections),
      })),
      message: "Got posts!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting posts:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function getPost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return {
        message: "Post not found!",
        ok: false,
      };
    }

    return {
      post: {
        ...post,
        sections: JSON.parse(post.sections),
      },
      message: "Got post!",
      ok: true,
    };
  } catch (error) {
    console.error("Error getting post:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}

export async function togglePostVisibility(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return {
        message: "Post not found!",
        ok: false,
      };
    }

    const isVisible = !post.isVisible;

    await prisma.post.update({
      where: { id },
      data: {
        isVisible,
      },
    });

    revalidatePath("/dashboard/posts");

    return {
      message: "Toggled post visibility!",
      ok: true,
    };
  } catch (error) {
    console.error("Error toggling post visibility:", error);
    return {
      message: "Internal server error.",
      ok: false,
    };
  }
}
