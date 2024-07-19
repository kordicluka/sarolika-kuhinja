// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard", "/dashboard/:path*"],
// };

// This function can be marked `async` if using `await` inside

import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export function middleware(request) {
  // Get the user session
  const session = getSession({ req: request });

  // If the user is not logged in, redirect to the home page
  if (!session) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // If the user is logged in, redirect

  // return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
