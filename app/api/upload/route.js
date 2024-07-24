import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.formData()
  const files = data.getAll('files')

  if (!files.length) {
    return NextResponse.json({
      status: 400,
      body: { message: 'Niste uploadali datoteku.' },
    })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  const urls = []

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        status: 400,
        body: { message: 'Krivi tip datoteke datoteke: ' + file.name },
      })
    }

    const blob = await put(`uploads/${file.name + Date.now()}`, file, {
      access: 'public',
    })

    urls.push(blob.url)
  }

  console.log('Datoteke uspješno uploadane:', urls)

  return NextResponse.json({
    status: 200,
    body: { message: 'Datoteke uspješno uploadane.', urls },
  })
}
