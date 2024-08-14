'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/utils/db'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { generateSlug } from '@/utils/slug'
import { join } from 'path'
import { unlink } from 'fs/promises'

export async function createPost(data) {
  const session = await getServerSession(authOptions)

  try {
    const { title, slug, description, isVisible, sections, image } = data

    if (!title) {
      return { message: 'Naslov je obavezan.', ok: false }
    }

    if (!description) {
      return { message: 'Opis je obavezan.', ok: false }
    }

    if (typeof isVisible !== 'boolean') {
      return { message: 'Vidljivost je obavezna.', ok: false }
    }

    if (!sections) {
      return { message: 'Sekcije su obavezne.', ok: false }
    }

    if (!image) {
      return { message: 'Slika je obavezna.', ok: false }
    }

    const finalSlug = slug || generateSlug(title)

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
    })

    revalidatePath('/dashboard/blog')
    revalidatePath('/blog')
    revalidatePath('/')

    return {
      message: 'Objava je uspješno stvorena!',
      post,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri stvaranju posta:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function deletePost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return { message: 'Post nije pronađen!', ok: false }
    }

    if (post.image) {
      const key = post.image
      const path = join(process.cwd(), 'public', 'uploads', key)

      try {
        await unlink(path)
      } catch (error) {
        console.error('Greška pri brisanju datoteke:', error)
      }
    }

    await prisma.post.delete({
      where: { id: id },
    })

    revalidatePath('/dashboard/blog')
    revalidatePath('/blog')
    revalidatePath('/')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath(`/dashboard/blog/${post.id}`)

    return {
      message: 'Objava je uspješno izbrisana!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri brisanju objave:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function updatePost(data) {
  const session = await getServerSession(authOptions)
  try {
    const { id, image, title, slug, description, isVisible, sections } = data

    if (!id) {
      return { message: 'ID posta je obavezan.', ok: false }
    }

    if (!title) {
      return { message: 'Naslov je obavezan.', ok: false }
    }

    if (!description) {
      return { message: 'Opis je obavezan.', ok: false }
    }

    if (typeof isVisible !== 'boolean') {
      return { message: 'Vidljivost je obavezna.', ok: false }
    }

    if (!sections) {
      return { message: 'Sekcije su obavezne.', ok: false }
    }

    if (!image) {
      return { message: 'Slika je obavezna.', ok: false }
    }

    const existingPost = await prisma.post.findUnique({
      where: { id },
    })

    if (!existingPost) {
      return { message: 'Objava ne postoji!', ok: false }
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
    })

    revalidatePath('/dashboard/blog')
    revalidatePath('/blog')
    revalidatePath('/')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath(`/dashboard/blog/${post.id}`)

    return {
      message: 'Objava je uspješno ažuriran!',
      post,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri ažuriranju objave:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany()

    return {
      posts: posts.map((post) => ({
        ...post,
        sections: JSON.parse(post.sections),
      })),
      message: 'Objave su uspješno dostavljeni!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju objave:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getPost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return { message: 'Objava nije pronađena!', ok: false }
    }

    return {
      post: {
        ...post,
        sections: JSON.parse(post.sections),
      },
      message: 'Objava je uspješno dobivena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju objave:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function togglePostVisibility(id) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    })

    if (!post) {
      return { message: 'Objava nije pronađen!', ok: false }
    }

    const isVisible = !post.isVisible

    await prisma.post.update({
      where: { id },
      data: {
        isVisible,
      },
    })

    revalidatePath('/dashboard/blog')
    revalidatePath('/blog')
    revalidatePath('/')
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath(`/dashboard/blog/${post.id}`)

    return {
      message: 'Vidljivost objave je uspješno promijenjena!',
      ok: true,
    }
  } catch (error) {
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getPostBySlug(slug) {
  try {
    const post = await prisma.post.findFirst({
      where: { slug },
    })

    if (!post) {
      return { message: 'Objava nije pronađen!', ok: false }
    }

    return {
      post: {
        ...post,
        sections: JSON.parse(post.sections),
      },
      message: 'Objava je uspješno dobiven!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju posta:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}
