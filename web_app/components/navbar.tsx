import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import AvatarDropdownMenu from "./avatar-dropdown-menu";

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={32}
                height={32}
                className="transition-transform group-hover:scale-105"
              />
            </div>
            <span className="font-poppins font-bold text-xl hidden sm:inline-block">
              100xTestimonials
            </span>
          </Link>

          {/* Navigation Links - Only show when logged in */}
          {session?.user && (
            <div className="hidden md:flex items-center gap-1">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Button>
              </Link>
              <Link href="/buy-premium">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Sparkles size={16} />
                  Upgrade
                </Button>
              </Link>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {!session?.user ? (
              <Link href="/api/auth/signin">
                <Button className="group gap-2">
                  Sign In
                  <ArrowRight
                    className="opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                  />
                </Button>
              </Link>
            ) : (
              <AvatarDropdownMenu
                name={session.user.name || "User"}
                email={session.user.email || "example@gmail.com"}
                imageUrl={session.user.image || "/avatar.svg"}
              />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
