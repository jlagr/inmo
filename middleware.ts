import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("token")?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const authenticated = await isAuthenticated(request);
  const { pathname } = request.nextUrl;

  // Protect admin API routes
  if (pathname.startsWith("/api/admin")) {
    if (!authenticated) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Protect admin UI pages
  if (pathname.startsWith("/adm/")) {
    if (!authenticated) {
      return NextResponse.redirect(new URL("/adm", request.url));
    }
    return NextResponse.next();
  }

  // Redirect /adm to dashboard if already logged in
  if (pathname === "/adm" && authenticated) {
    return NextResponse.redirect(new URL("/adm/propiedades", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/adm", "/adm/:path+", "/api/admin/:path*"],
};
