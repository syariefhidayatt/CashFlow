import { NextResponse } from "next/server";
import { auth } from "./auth";

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isPrivateRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/transaction") ||
    pathname.startsWith("/category");
  const isAuthRoute = pathname.startsWith("/login");

  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
