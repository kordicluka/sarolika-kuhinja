import { NextResponse } from 'next/server'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import path from 'path'

const pump = promisify(pipeline)

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
  }

  for (const file of files) {
    const fileName = `${Date.now()}-${file.name}`
    const uploadDir = path.join(process.cwd(), '/public/uploads')

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    const filePath = path.join(uploadDir, fileName)
    const buffer = Buffer.from(await file.arrayBuffer()) // Convert the file to Buffer

    await fs.promises.writeFile(filePath, buffer)
    urls.push(`/uploads/${fileName}`)
  }

  return NextResponse.json({
    status: 200,
    body: { message: 'Datoteke uspješno uploadane.', urls },
  })
}
