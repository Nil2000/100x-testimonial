import { NextResponse } from "next/server";
import {
  authPrefix,
  DEFAULT_REDIRECT,
  isAuthRoute,
  requiresAuthentication,
} from "./lib/routes";
import { auth } from "./lib/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  if (pathname === "/not-found") {
    return NextResponse.redirect(new URL("/404", nextUrl));
  }

  // NextAuth handlers — always public
  if (pathname.startsWith(authPrefix)) {
    return NextResponse.next();
  }

  if (isAuthRoute(pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && requiresAuthentication(pathname)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)", "/"],
};
