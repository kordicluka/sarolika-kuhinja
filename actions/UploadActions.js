'use server'
import { put, del } from '@vercel/blob'

export async function uploadImage(imageFile) {
  try {
    // upload with blob and in the /uploads/ folder

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

    if (!allowedTypes.includes(imageFile.type)) {
      return {
        message: 'Krivi tip datoteke datoteke: ' + imageFile.name,
        ok: false,
      }
    }

    const blob = await put(
      `/uploads/${imageFile.name + Date.now()}`,
      imageFile,
      {
        access: 'public',
      }
    )

    console.log('Slika uspješno uploadana:')

    return {
      message: 'Slika je uspješno uploadana!',
      ok: true,
      key: blob.Key,
    }
  } catch (error) {
    console.error('Greška pri uploadanju slika:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}

export async function deleteImage(imageKey) {
  try {
    // delete with blob

    await del(imageKey)

    console.log('Slika uspješno obrisana:', imageKey)

    return {
      message: 'Slika je uspješno obrisana!',
      ok: true,
    }
  } catch (error) {
    console.error('Greška pri brisanju slike:', error)
    return {
      message: 'Interna greška poslužitelja.',
      ok: false,
    }
  }
}
