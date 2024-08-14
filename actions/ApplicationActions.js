'use server'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import prisma from '@/utils/db'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export async function createApplication(data) {
  try {
    const {
      name,
      surname,
      childName,
      telephone,
      email,
      childAlergies,
      additionalNotes,
      workshopId,
      photoPermission,
    } = data

    if (!name) {
      return {
        message: 'Ime je obavezno.',
        ok: false,
      }
    }

    if (!surname) {
      return {
        message: 'Prezime je obavezno.',
        ok: false,
      }
    }

    if (!childName) {
      return {
        message: 'Ime djeteta je obavezno.',
        ok: false,
      }
    }

    if (!telephone) {
      return {
        message: 'Telefon je obavezan.',
        ok: false,
      }
    }

    if (!workshopId) {
      return {
        message: 'ID radionice je obavezan.',
        ok: false,
      }
    }

    if (typeof photoPermission !== 'boolean') {
      return {
        message: 'Dozvola za fotografiranje je obavezna.',
        ok: false,
      }
    }

    if (email && !validateEmail(email)) {
      return {
        message: 'E-mail adresa nije valjana.',
        ok: false,
      }
    }

    const application = await prisma.application.create({
      data: {
        name,
        surname,
        childName,
        telephone,
        email,
        childAlergies,
        additionalNotes,
        workshopId,
        photoPermission,
      },
    })

    revalidatePath(`/dashboard/radionice/${workshopId}/prijave`)

    return {
      message: 'Prijava je uspješno stvorena!',
      application,
      ok: true,
    }
  } catch (error) {
    console.error('Error creating application:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function deleteApplication(id) {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
    })

    if (!application) {
      return {
        message: 'Prijava nije pronađena!',
        ok: false,
      }
    }

    await prisma.application.delete({
      where: { id },
    })

    revalidatePath(`/dashboard/radionice/${application.workshopId}/prijave`)

    return {
      message: 'Prijava je uspješno izbrisana!',
      ok: true,
    }
  } catch (error) {
    console.error('Error deleting application:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function updateApplication(data) {
  try {
    const {
      id,
      name,
      surname,
      childName,
      telephone,
      email,
      childAlergies,
      additionalNotes,
      workshopId,
      photoPermission,
    } = data

    if (!id) {
      return {
        message: 'ID prijave je obavezan.',
        ok: false,
      }
    }

    if (!name) {
      return {
        message: 'Ime je obavezno.',
        ok: false,
      }
    }

    if (!surname) {
      return {
        message: 'Prezime je obavezno.',
        ok: false,
      }
    }

    if (!childName) {
      return {
        message: 'Ime djeteta je obavezno.',
        ok: false,
      }
    }

    if (!telephone) {
      return {
        message: 'Telefon je obavezan.',
        ok: false,
      }
    }

    if (!workshopId) {
      return {
        message: 'ID radionice je obavezan.',
        ok: false,
      }
    }

    if (typeof photoPermission !== 'boolean') {
      return {
        message: 'Dozvola za fotografiranje je obavezna.',
        ok: false,
      }
    }

    if (email && !validateEmail(email)) {
      return {
        message: 'E-mail adresa nije valjana.',
        ok: false,
      }
    }

    const existingApplication = await prisma.application.findUnique({
      where: { id },
    })

    if (!existingApplication) {
      return {
        message: 'Prijava ne postoji!',
        ok: false,
      }
    }

    const application = await prisma.application.update({
      where: { id },
      data: {
        name,
        surname,
        childName,
        telephone,
        email,
        childAlergies,
        additionalNotes,
        workshopId,
        photoPermission,
      },
    })

    revalidatePath(`/dashboard/radionice/${workshopId}/prijave`)

    return {
      message: 'Prijava je uspješno ažurirana!',
      application,
      ok: true,
    }
  } catch (error) {
    console.error('Error updating application:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getApplications(workshopId) {
  try {
    const applications = await prisma.application.findMany({
      where: { workshopId },
    })

    return {
      applications,
      message: 'Prijave su uspješno dobivene!',
      ok: true,
    }
  } catch (error) {
    console.error('Error getting applications:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function getApplication(id) {
  try {
    const application = await prisma.application.findUnique({
      where: { id },
    })

    if (!application) {
      return {
        message: 'Prijava nije pronađena!',
        ok: false,
      }
    }

    return {
      application,
      message: 'Prijava je uspješno dobivena!',
      ok: true,
    }
  } catch (error) {
    console.error('Error getting application:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}
