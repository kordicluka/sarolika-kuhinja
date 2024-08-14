'use server'
import prisma from '@/utils/db'
import { revalidatePath } from 'next/cache'
import { join } from 'path'
import { unlink } from 'fs/promises'

export async function createSectionType(data) {
  try {
    const { title, jsxContent, image } = data

    if (!title) {
      return { message: 'Naslov je obavezan.', ok: false }
    }

    if (!jsxContent) {
      return { message: 'JSX sadržaj je obavezan.', ok: false }
    }

    if (!image) {
      return { message: 'Slika je obavezna.', ok: false }
    }

    const existingSectionType = await prisma.sectionType.findUnique({
      where: { title },
    })

    if (existingSectionType) {
      return { message: 'Tip sekcije već postoji!', ok: false }
    }

    const sectionType = await prisma.sectionType.create({
      data: { title, image, jsxContent: JSON.stringify(jsxContent) },
    })

    revalidatePath('/dashboard/tipovi-sekcija')

    return {
      message: 'Tip sekcije je uspješno stvoren!',
      sectionType,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri stvaranju tipa sekcije:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function deleteSectionType(id) {
  try {
    const sectionType = await prisma.sectionType.findUnique({
      where: { id },
    })

    if (!sectionType) {
      return { message: 'Tip sekcije nije pronađen!', ok: false }
    }

    if (sectionType.image) {
      const key = sectionType.image
      const path = join(process.cwd(), 'public', 'uploads', key)

      try {
        await unlink(path)
      } catch (error) {
        console.error('Greška pri brisanju datoteke:', error)
      }
    }

    await prisma.sectionType.delete({
      where: { id: id },
    })

    revalidatePath('/dashboard/tipovi-sekcija')
    revalidatePath(`/dashboard/tipovi-sekcija/${id}`)

    return {
      message: 'Tip sekcije je uspješno izbrisan!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri brisanju tipa sekcije:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function updateSectionType(data) {
  try {
    const { id, title, jsxContent, image } = data

    if (!id) {
      return { message: 'ID tipa sekcije je obavezan.', ok: false }
    }

    if (!title) {
      return { message: 'Naslov je obavezan.', ok: false }
    }

    if (!jsxContent) {
      return { message: 'JSX sadržaj je obavezan.', ok: false }
    }

    if (!image) {
      return { message: 'Slika je obavezna.', ok: false }
    }

    const existingSectionType = await prisma.sectionType.findUnique({
      where: { id },
    })

    if (!existingSectionType) {
      return { message: 'Tip sekcije ne postoji!', ok: false }
    }

    const sectionType = await prisma.sectionType.update({
      where: { id },
      data: { title, image, jsxContent: JSON.stringify(jsxContent) },
    })

    revalidatePath('/dashboard/tipovi-sekcija')
    revalidatePath(`/dashboard/tipovi-sekcija/${id}`)

    return {
      message: 'Tip sekcije je uspješno ažuriran!',
      sectionType,
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri ažuriranju tipa sekcije:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getSectionTypes() {
  try {
    const sectionTypes = await prisma.sectionType.findMany()

    return {
      sectionTypes: sectionTypes.map((type) => ({
        ...type,
        jsxContent: JSON.parse(type.jsxContent),
      })),
      message: 'Tipovi sekcija su uspješno dobiveni!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju tipova sekcija:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getSectionType(id) {
  try {
    const sectionType = await prisma.sectionType.findUnique({
      where: { id },
    })

    if (!sectionType) {
      return { message: 'Tip sekcije nije pronađen!', ok: false }
    }

    return {
      sectionType: {
        ...sectionType,
        jsxContent: JSON.parse(sectionType.jsxContent),
      },
      message: 'Tip sekcije je uspješno dobiven!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri dobivanju tipa sekcije:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}
