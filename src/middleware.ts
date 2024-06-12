import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/users", "/profile"],
};

export function middleware(req: NextRequest) {
  const session = req.cookies.get("next-auth.session-token");

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
