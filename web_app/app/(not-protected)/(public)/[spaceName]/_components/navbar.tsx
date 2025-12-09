"use client";
import Image from "next/image";
import React from "react";
import { cx } from "class-variance-authority";

type Props = {
  themeType: string | null;
};

export default function RequestTestimonialPageNavbar({ themeType }: Props) {
  return (
    <nav
      className={cx(
        "w-full px-6 md:px-8 py-4 border-b flex items-center justify-between backdrop-blur-sm",
        themeType === "dark"
          ? "border-white/10 bg-black/20"
          : "border-black/10 bg-white/20"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Image src="/logo.svg" alt="Logo" width={20} height={20} />
        </div>
        <h2
          className={cx(
            "font-poppins font-semibold text-lg md:text-xl",
            themeType === "dark"
              ? "text-white"
              : themeType === "light"
              ? "text-black"
              : "text-foreground"
          )}
        >
          100xTestimonials
        </h2>
      </div>
    </nav>
  );
}
