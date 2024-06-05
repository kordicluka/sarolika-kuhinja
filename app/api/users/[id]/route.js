// api/auth/[id]/route.js

import { NextResponse } from "next/server";

//  make the delete function

export async function DELETE(request) {
  const { id } = params;
  //   const user = await prisma.user.delete({
  //     where: {
  //       id: parseInt(id),
  //     },
  //   });

  return NextResponse.json({
    status: 200,
    message: "Korisnik uspješno obrisan.",
  });
}

//  make the edit function

export async function PUT(request) {
  const { id } = params;
  const data = await request.json();
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...data,
    },
  });

  return NextResponse.json({
    status: 200,
    message: "Korisnik uspješno ažuriran.",
    user: user,
  });
}

//  make the create function
