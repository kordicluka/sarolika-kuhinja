import { writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const files = data.getAll("files");

  if (!files.length) {
    return NextResponse.json({
      status: 400,
      body: { message: "Niste uploadali datoteku." },
    });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  const keys = [];

  for (const file of files) {
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        status: 400,
        body: { message: "Krivi tip datoteke datoteke: " + file.name },
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = new Date().getTime() + "-" + file.name;
    const path = join(process.cwd(), "public", "uploads", fileName);
    await writeFile(path, buffer);
    keys.push(fileName);
  }

  return NextResponse.json({
    status: 200,
    body: { message: "Datoteke uspješno uploadane.", keys: keys },
  });
}
