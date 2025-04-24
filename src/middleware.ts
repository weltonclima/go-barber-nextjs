import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';
import { tokenValidate } from './utils/tokenValidate';

export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl.clone();
  const exists = request.cookies.has("go-barber-token");

  if (!exists && (
    !nextUrl.pathname.startsWith("/forgout") &&
    !nextUrl.pathname.startsWith("/signup")
  )) {
    return NextResponse.redirect(nextUrl.origin)
  }

  if (exists) {
    try {
      const token = request.cookies.get("go-barber-token");
      const isValid = tokenValidate(token?.value ?? "");
      if (!isValid) {
        return NextResponse.redirect(nextUrl.origin)
      }
    } catch (error) {
      return NextResponse.redirect(nextUrl.origin)
    }
  }
}

export const config = {
  matcher: [
    "/forgout",
    "/signup"
  ]
}