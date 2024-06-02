import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: 401,
      error: "Unauthorized",
    });
  }

  return NextResponse.json({
    status: 200,
    authenticated: !!session,
  });
}
