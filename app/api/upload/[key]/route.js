import { NextResponse } from 'next/server'
import { join } from 'path'
import { unlink } from 'fs/promises'

export async function DELETE(request, { params }) {
  const { key } = params
  if (!key) {
    return NextResponse.json({
      status: 400,
      body: { message: 'File key is missing.' },
    })
  }

  const path = join(process.cwd(), 'public', 'uploads', key)

  try {
    await unlink(path)
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json({
      status: 500,
      body: { message: 'Error deleting file.' },
    })
  }

  return NextResponse.json({
    status: 200,
    body: { message: 'File deleted successfully.' },
  })
}
