"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function PublicNavbar() {
  const searchParams = useSearchParams();
  const isCentered = searchParams.has("wall-of-love");

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <nav className="container mx-auto px-4 md:px-6">
        <div
          className={`flex h-16 items-center ${
            isCentered ? "justify-center" : "justify-between"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="transition-transform group-hover:scale-105"
              />
            </div>
            <span className="font-poppins font-bold text-xl sm:text-2xl">
              100xTestimonials
            </span>
          </Link>

          {/* CTA Button - Only show when not centered */}
          {!isCentered && (
            <Link href="/api/auth/signin">
              <Button className="group gap-2" size="sm">
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Sign In</span>
                <ArrowRight
                  className="opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                />
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
