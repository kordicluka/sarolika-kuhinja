import { writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({
      status: 400,
      body: { message: "Niste uploadali datoteku." },
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({
      status: 400,
      body: { message: "Krivi tip datoteke." },
    });
  }

  const path = join(process.cwd(), "public", file.name);
  await writeFile(path, buffer);

  return NextResponse.json({
    status: 200,
    body: { message: "Datoteka uspješno uploadana." },
  });
}
