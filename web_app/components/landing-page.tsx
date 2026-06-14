"use client";
import React from "react";
import LandingPageNavbarV2 from "./landing-page-navbarv2";
import { Session } from "next-auth";
import HeroSection from "./hero-section";
type Props = {
  session: Session | null;
};
export default function LandingPage({ session }: Props) {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background font-poppins text-foreground">
      <LandingPageNavbarV2 session={session} />
      <HeroSection loggedIn={!!session} />
    </main>
  );
}
