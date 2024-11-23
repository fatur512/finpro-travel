import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (token) {
    NextResponse.next();
  } else {
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/admin", "/member"],
};
