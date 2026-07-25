"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Quote, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import { Marquee } from "./ui/marquee";
import { cn } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Maya Rensburg",
    role: "Founder, Driftwork",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=60",
    quote:
      "We embedded our wall of love on the pricing page and trial sign-ups jumped 31% in two weeks.",
  },
  {
    name: "Daniel Okafor",
    role: "Head of Growth, Lumen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    quote:
      "Collecting video testimonials used to take a month of chasing. Now it's a single link.",
  },
  {
    name: "Priya Nair",
    role: "Indie maker",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    quote:
      "The cleanest way I've found to turn a happy DM into social proof on my landing page.",
  },
  {
    name: "Theo Lindqvist",
    role: "CEO, Northwind",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
    quote:
      "Beautiful by default. Our testimonials finally look like they belong on the brand.",
  },
  {
    name: "Aisha Bello",
    role: "Marketing lead, Paystack-ish",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60",
    quote:
      "Set up in an afternoon. The import from Twitter alone paid for the whole plan.",
  },
  {
    name: "Marco Bianchi",
    role: "Founder, Cobalt",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&auto=format&fit=crop&q=60",
    quote:
      "Real customer love, organized and ready to publish. It's become part of our launch checklist.",
  },
];

function TestimonialCard({ name, role, avatar, quote }: Testimonial) {
  return (
    <figure className="w-[300px] shrink-0 rounded-2xl border border-border bg-card/70 p-5 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40">
      <Quote className="h-5 w-5 text-primary/60" aria-hidden="true" />
      <blockquote className="mt-3 text-sm leading-relaxed text-foreground/80">
        {quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Image
          src={avatar}
          alt={name}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover object-top"
        />
        <div className="leading-tight">
          <div className="text-sm font-medium text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

const ease = [0.2, 0.8, 0.2, 1] as const;

export default function HeroSection({ loggedIn }: { loggedIn: boolean }) {
  const router = useRouter();

  const handleStart = () => {
    router.push(loggedIn ? "/dashboard" : "/api/auth/signin");
  };

  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3);

  return (
    <section className="relative w-full overflow-hidden font-poppins">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 55% at 50% 0%, black 30%, transparent 75%)",
          }}
        />
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute right-[8%] top-[20%] h-[320px] w-[320px] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-4 pt-32 pb-16 text-center sm:pt-36">
        {/* Eyebrow / social proof */}
        <motion.div
          className="flex items-center gap-3 rounded-full border border-border bg-background/60 py-1.5 pl-1.5 pr-4 shadow-sm backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex -space-x-2">
            {firstRow.concat(secondRow.slice(0, 1)).map((t) => (
              <Image
                key={t.name}
                src={t.avatar}
                alt={t.name}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full border-2 border-background object-cover object-top"
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-primary text-primary"
                  aria-hidden="true"
                />
              ))}
            </span>
            Loved by{" "}
            <strong className="font-semibold text-foreground">60,000+</strong>{" "}
            founders
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-8 max-w-4xl font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          Turn customer love into
          <br className="hidden sm:block" />{" "}
          <span className="relative whitespace-nowrap text-primary">
            testimonials that sell
            <svg
              className="absolute -bottom-2 left-0 w-full text-primary/40"
              viewBox="0 0 300 12"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M2 9C58 3 130 2 298 6"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          Collect, manage, and showcase testimonials on pages that feel like part
          of your brand — and quietly do your selling for you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <Button
            size="lg"
            className="group h-12 rounded-full px-7 text-sm"
            onClick={handleStart}
          >
            {loggedIn ? "Go to dashboard" : "Start collecting free"}
            <ArrowRight
              className="ms-2 opacity-70 transition-transform group-hover:translate-x-1"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-border bg-background/60 px-7 text-sm backdrop-blur-sm"
            onClick={() => router.push("#features")}
          >
            See how it works
          </Button>
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          No credit card required · Set up in minutes
        </motion.p>

        {/* Signature: wall of love */}
        <motion.div
          className="relative mt-16 w-screen max-w-none"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease }}
        >
          <div className="flex flex-col gap-4">
            <Marquee pauseOnHover className="[--duration:38s]">
              {firstRow.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:44s]">
              {secondRow.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </Marquee>
          </div>
          {/* Edge fades */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-1/4",
              "bg-gradient-to-r from-background to-transparent"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-1/4",
              "bg-gradient-to-l from-background to-transparent"
            )}
          />
        </motion.div>
      </div>
    </section>
  );
}
