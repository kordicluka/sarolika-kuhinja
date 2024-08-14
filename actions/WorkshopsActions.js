'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/utils/db'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { generateSlug } from '@/utils/slug'
import { join } from 'path'
import { unlink } from 'fs/promises'

export async function createWorkshop(data) {
  const session = await getServerSession(authOptions)

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
    } = data

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

    if (!date) {
      return { message: 'Datum je obavezan.', ok: false }
    }

    if (!maxApplicant) {
      return { message: 'Maksimalan broj prijava je obavezan.', ok: false }
    }

    const finalSlug = slug || generateSlug(title)

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
    })

    revalidatePath('/dashboard/radionice')
    revalidatePath('/radionice')
    revalidatePath('/')

    const workshopsThatNeedToRevalidate = await prisma.workshop.findMany({
      where: { date: { lte: new Date() } },
      select: { slug: true },
    })

    const workshopsWithApplicationCount = await prisma.workshop.findMany({
      select: {
        id: true,
        slug: true,
        maxApplicant: true,
        _count: {
          select: { applications: true },
        },
      },
    })

    const workshopsThatNeedToRevalidate2 = workshopsWithApplicationCount.filter(
      (workshop) => workshop.maxApplicant <= workshop._count.applications
    )

    workshopsThatNeedToRevalidate2.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })
    workshopsThatNeedToRevalidate.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })

    return {
      message: 'Radionica je uspješno stvorena!',
      workshop,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri stvaranju radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function deleteWorkshop(id) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    })

    if (!workshop) {
      return { message: 'Radionica nije pronađena!', ok: false }
    }

    if (workshop.image) {
      const key = workshop.image
      const path = join(process.cwd(), 'public', 'uploads', key)

      try {
        await unlink(path)
      } catch (error) {
        console.error('Greška pri brisanju datoteke:', error)
      }
    }

    await prisma.workshop.delete({
      where: { id: id },
    })

    revalidatePath('/dashboard/radionice')
    revalidatePath(`/dashboard/radionice/${id}`)
    revalidatePath('/radionice')
    revalidatePath('/')
    revalidatePath(`/radionice/${workshop.slug}`)

    const workshopsThatNeedToRevalidate = await prisma.workshop.findMany({
      where: { date: { lte: new Date() } },
      select: { slug: true },
    })

    const workshopsWithApplicationCount = await prisma.workshop.findMany({
      select: {
        id: true,
        slug: true,
        maxApplicant: true,
        _count: {
          select: { applications: true },
        },
      },
    })

    const workshopsThatNeedToRevalidate2 = workshopsWithApplicationCount.filter(
      (workshop) => workshop.maxApplicant <= workshop._count.applications
    )

    workshopsThatNeedToRevalidate2.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })
    workshopsThatNeedToRevalidate.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })

    return {
      message: 'Radionica je uspješno izbrisana!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri brisanju radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function updateWorkshop(data) {
  const session = await getServerSession(authOptions)
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
    } = data

    if (!id) {
      return { message: 'ID je obavezan.', ok: false }
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

    if (!date) {
      return { message: 'Datum je obavezan.', ok: false }
    }

    if (!maxApplicant) {
      return { message: 'Maksimalan broj prijava je obavezan.', ok: false }
    }

    const existingWorkshop = await prisma.workshop.findUnique({
      where: { id },
    })

    if (!existingWorkshop) {
      return { message: 'Radionica ne postoji!', ok: false }
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
    })

    revalidatePath('/dashboard/radionice')
    revalidatePath('/radionice')
    revalidatePath('/')
    revalidatePath(`/radionice/${workshop.slug}`)
    revalidatePath(`/dashboard/radionice/${id}`)

    const workshopsThatNeedToRevalidate = await prisma.workshop.findMany({
      where: { date: { lte: new Date() } },
      select: { slug: true },
    })

    const workshopsWithApplicationCount = await prisma.workshop.findMany({
      select: {
        id: true,
        slug: true,
        maxApplicant: true,
        _count: {
          select: { applications: true },
        },
      },
    })

    const workshopsThatNeedToRevalidate2 = workshopsWithApplicationCount.filter(
      (workshop) => workshop.maxApplicant <= workshop._count.applications
    )

    workshopsThatNeedToRevalidate2.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })
    workshopsThatNeedToRevalidate.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })

    return {
      message: 'Radionica je uspješno ažurirana!',
      workshop,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri ažuriranju radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getWorkshops() {
  try {
    const workshops = await prisma.workshop.findMany()

    return {
      workshop: workshops.map((workshop) => ({
        ...workshop,
        sections: JSON.parse(workshop.sections),
      })),
      message: 'Radionice su uspješno dobivene!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju radionica:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getWorkshop(id) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    })

    if (!workshop) {
      return { message: 'Radionica nije pronađena!', ok: false }
    }

    return {
      workshop: {
        ...workshop,
        sections: JSON.parse(workshop.sections),
      },
      message: 'Radionica je uspješno dobivena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function toggleWorkshopVisibility(id) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { id },
    })

    if (!workshop) {
      return { message: 'Radionica nije pronađena!', ok: false }
    }

    const isVisible = !workshop.isVisible

    await prisma.workshop.update({
      where: { id },
      data: {
        isVisible,
      },
    })

    revalidatePath('/dashboard/radionice')
    revalidatePath('/radionice')
    revalidatePath('/')
    revalidatePath(`/radionice/${workshop.slug}`)
    revalidatePath(`/dashboard/radionice/${id}`)

    const workshopsThatNeedToRevalidate = await prisma.workshop.findMany({
      where: { date: { lte: new Date() } },
      select: { slug: true },
    })

    const workshopsWithApplicationCount = await prisma.workshop.findMany({
      select: {
        id: true,
        slug: true,
        maxApplicant: true,
        _count: {
          select: { applications: true },
        },
      },
    })

    const workshopsThatNeedToRevalidate2 = workshopsWithApplicationCount.filter(
      (workshop) => workshop.maxApplicant <= workshop._count.applications
    )

    workshopsThatNeedToRevalidate2.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })
    workshopsThatNeedToRevalidate.forEach((workshop) => {
      console.log('Revalidating:', workshop.slug)
      revalidatePath(`/radionice/${workshop.slug}`)
    })

    return {
      message: 'Vidljivost radionice je uspješno promijenjena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri promjeni vidljivosti radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getWorkshopBySlug(slug) {
  try {
    const workshop = await prisma.workshop.findUnique({
      where: { slug },
    })

    if (!workshop) {
      return { message: 'Radionica nije pronađena!', ok: false }
    }

    return {
      workshop: {
        ...workshop,
        sections: JSON.parse(workshop.sections),
      },
      message: 'Radionica je uspješno dobivena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getNextWorkshop() {
  try {
    const nextWorkshop = await prisma.workshop.findFirst({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
    })

    if (!nextWorkshop) {
      return { message: 'Nema nadolazećih radionica!', ok: false }
    }

    return {
      workshop: {
        ...nextWorkshop,
        sections: JSON.parse(nextWorkshop.sections),
      },
      message: 'Nadolazeća radionica je uspješno dobivena!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju nadolazeće radionice:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function get3NextWortkshopsWithoutThis(id) {
  try {
    const workshops = await prisma.workshop.findMany({
      where: { id: { not: id }, date: { gte: new Date() } },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
        date: true,
        description: true,
      },
      orderBy: {
        date: 'asc',
      },
    })

    return {
      workshops,
      message: 'Nadolazeće radionice su uspješno dobivene!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju nadolazećih radionica:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}
