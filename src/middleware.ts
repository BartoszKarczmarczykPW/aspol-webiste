import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  
  // Exclude API routes, static files, etc.
  if (
    pathname.includes("/api/") ||
    pathname.includes("/_next/") ||
    pathname.includes("/static/") ||
    pathname.includes(".") // files with extensions
  ) {
    return NextResponse.next();
  }

  // Future implementation for URL-based routing:
  // 1. Check if pathname starts with /en, /fr, /pl
  // 2. If not, redirect to default locale based on Accept-Language header
  
  // For now, we allow the request to proceed as we are using client-side translation
  // until the proper [lang] folder structure is implemented.
  
  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/)
    // '/'
  ],
};
