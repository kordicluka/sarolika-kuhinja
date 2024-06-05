export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

// Adding debug logs
export function middleware(req, ev) {
  console.log("Middleware request:", req.url);
  return defaultMiddleware(req, ev);
}
