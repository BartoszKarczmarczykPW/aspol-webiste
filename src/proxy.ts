import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.includes("/api/") ||
    pathname.includes("/_next/") ||
    pathname.includes("/static/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
