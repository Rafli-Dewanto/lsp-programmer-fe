import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { logger } from "./utils/logger";
import { COOKIE_TOKEN } from "./constants";

interface JwtPayload {
  email: string;
  name: string;
  role: string;
  [key: string]: string;
}

const PUBLIC_PATHS = ["/", "/about", "/auth/login", "/auth/register", "/shop"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_TOKEN)?.value;

  // Redirect to login if token is missing
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const decoded: JwtPayload = jwtDecode(token);
    const role = decoded?.role;

    // Example: restrict /admin routes to admin role only
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // allow access
  } catch (error) {
    logger.trace("Error decoding token:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
