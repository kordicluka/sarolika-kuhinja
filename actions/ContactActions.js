'use server'

export async function sendContactFormEmail(data) {
  try {
    // make a post req to the 'https://mail-server-gold.vercel.app/send-enail/eter' endpoint
    const response = await fetch(
      'https://mail-server-gold.vercel.app/send-email/sarolika-kuhinja',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (response.status !== 200) {
      return {
        message: 'Došlo je do greške prilikom slanja emaila!',
        ok: false,
      }
    }

    return { message: 'Email je uspješno poslan!', ok: true }
  } catch (error) {
    return { message: 'Došlo je do greške prilikom slanja emaila!', ok: false }
  }
}
