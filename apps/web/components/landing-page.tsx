"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { ArrowRight } from "lucide-react";
import LandingPageNavbarV2 from "./landing-page-navbarv2";
import HeroSection from "./hero-section";
import LandingFeatures from "./landing-features";
import LandingPricing from "./landing-pricing";
import { Button } from "./ui/button";

type Props = {
  session: Session | null;
};

export default function LandingPage({ session }: Props) {
  const loggedIn = !!session;
  const startHref = loggedIn ? "/dashboard" : "/api/auth/signin";

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background font-poppins text-foreground">
      <LandingPageNavbarV2 session={session} />
      <HeroSection loggedIn={loggedIn} />
      <LandingFeatures />
      <LandingPricing loggedIn={loggedIn} />

      <section className="px-4 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-xl border border-border bg-card px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <h2 className="max-w-md font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Open a space and send the link.
          </h2>
          <Button asChild size="lg" className="group h-12 rounded-full px-7">
            <Link href={startHref}>
              {loggedIn ? "Go to dashboard" : "Start collecting free"}
              <ArrowRight
                className="ms-2 opacity-70 transition-transform group-hover:translate-x-1"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-foreground">TestiFlow</span>
          <span>Testimonials, collected and published.</span>
        </div>
      </footer>
    </main>
  );
}
