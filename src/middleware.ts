import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/users", "/profile/:path*"],
};

export function middleware(req: NextRequest) {
  let session;
  if (process.env.NODE_ENV === "production") {
    session = req.cookies.get("__Secure-next-auth.session-token");
  } else {
    session = req.cookies.get("next-auth.session-token");
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
