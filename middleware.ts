import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import { NextResponse } from "next/server";
import {
  authPrefix,
  authRoutes,
  DEFAULT_REDIRECT,
  protectedRoutes,
} from "./lib/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isProtected = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoutes = nextUrl.pathname.startsWith(authPrefix);

  if (nextUrl.pathname === "/not-found") {
    return NextResponse.redirect(new URL("/404", nextUrl));
  }

  if (isApiAuthRoutes) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && isProtected) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)", "/"],
};
