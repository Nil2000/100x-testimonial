"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import AppLogo from "./app-logo";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Session } from "next-auth";
import AvatarDropDownMenu from "./avatar-dropdown-menu";
import ThemeToggle from "./theme-toggle";
type Props = {
  session: Session | null;
};
export default function LandingPageNavbarV2({ session }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      // 100px from top
      setVisible(true);
    } else {
      setVisible(false);
    }
  });
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-40 mx-auto flex h-16 items-center justify-between px-4 font-poppins sm:px-6",
        visible && "border border-border bg-background/70",
      )}
      animate={{
        y: visible ? "1rem" : 0,
        width: visible ? "min(90%, 64rem)" : "100%",
        borderRadius: visible ? "4rem" : "0rem",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "0 0 0 0 transparent",
      }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
    >
      <Link href="/" className="flex items-center gap-2">
        <AppLogo width={32} height={32} />
        <span className="text-lg font-semibold tracking-tight sm:text-xl">
          100x<span className="text-primary">Testimonials</span>
        </span>
      </Link>

      <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm text-muted-foreground md:flex">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        {!session?.user ? (
          <Button asChild className="group rounded-full px-5">
            <Link href="/api/auth/signin" className="flex items-center">
              Get Started
              <ArrowRight
                className="ms-2 opacity-70 transition-transform group-hover:translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </Button>
        ) : (
          <AvatarDropDownMenu
            name={session.user.name || "User"}
            email={session.user.email || "example@gmail.com"}
            imageUrl={session.user.image || "/avatar.svg"}
          />
        )}
      </div>
    </motion.div>
  );
}
