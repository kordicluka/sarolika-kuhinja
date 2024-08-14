'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/utils/db'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { generateSlug } from '@/utils/slug'
import { join } from 'path'
import { unlink } from 'fs/promises'

export async function createMeal(data) {
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
    })

    revalidatePath('/dashboard/jela')
    revalidatePath(`/jela`)
    revalidatePath('/')

    return {
      message: 'Jelo je uspješno stvoreno!',
      meal,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri stvaranju jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function deleteMeal(id) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    if (!meal) {
      return { message: 'Jelo nije pronađeno!', ok: false }
    }

    if (meal.image) {
      const key = meal.image
      const path = join(process.cwd(), 'public', 'uploads', key)

      try {
        await unlink(path)
      } catch (error) {
        console.error('Greška pri brisanju datoteke:', error)
      }
    }

    await prisma.meal.delete({
      where: { id: id },
    })

    revalidatePath('/dashboard/jela')
    revalidatePath(`/jela`)
    revalidatePath('/')
    revalidatePath(`/jela/${meal.slug}`)
    revalidatePath(`/dashboard/jela/${id}`)

    return {
      message: 'Jelo je uspješno izbrisano!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri brisanju jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function updateMeal(data) {
  const session = await getServerSession(authOptions)
  try {
    const { id, image, title, slug, description, isVisible, sections } = data

    if (!id) {
      return { message: 'ID jela je obavezan.', ok: false }
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

    const existingMeal = await prisma.meal.findUnique({
      where: { id },
    })

    if (!existingMeal) {
      return { message: 'Jelo ne postoji!', ok: false }
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
    })

    revalidatePath('/dashboard/jela')
    revalidatePath(`/jela`)
    revalidatePath('/')
    revalidatePath(`/jela/${meal.slug}`)
    revalidatePath(`/dashboard/jela/${id}`)

    return {
      message: 'Jelo je uspješno ažurirano!',
      meal,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri ažuriranju jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getMeals() {
  try {
    const meals = await prisma.meal.findMany()

    return {
      meals: meals.map((meal) => ({
        ...meal,
        sections: JSON.parse(meal.sections),
      })),
      message: 'Jela su uspješno dobivena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getMeal(id) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    if (!meal) {
      return { message: 'Jelo nije pronađeno!', ok: false }
    }

    return {
      meal: {
        ...meal,
        sections: JSON.parse(meal.sections),
      },
      message: 'Jelo je uspješno dobiveno!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function toggleMealVisibility(id) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { id },
    })

    if (!meal) {
      return { message: 'Jelo nije pronađeno!', ok: false }
    }

    const isVisible = !meal.isVisible

    await prisma.meal.update({
      where: { id },
      data: {
        isVisible,
      },
    })

    revalidatePath('/dashboard/jela')
    revalidatePath(`/jela`)
    revalidatePath('/')
    revalidatePath(`/jela/${meal.slug}`)
    revalidatePath(`/dashboard/jela/${id}`)

    return {
      message: 'Vidljivost jela je uspješno promijenjena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri promjeni vidljivosti jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getMealBySlug(slug) {
  try {
    const meal = await prisma.meal.findUnique({
      where: { slug },
    })

    if (!meal) {
      return { message: 'Jelo nije pronađeno!', ok: false }
    }

    return {
      meal: {
        ...meal,
        sections: JSON.parse(meal.sections),
      },
      message: 'Jelo je uspješno dobiveno!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju jela:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}
