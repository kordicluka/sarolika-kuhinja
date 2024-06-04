import { writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({
      status: 400,
      body: { message: "No file uploaded" },
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join(process.cwd(), "public", file.name);
  await writeFile(path, buffer);
  console.log(`File saved to ${path}`);

  return NextResponse.json({ succes: true, path });
}
