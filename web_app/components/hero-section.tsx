"use client";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export default function HeroSection({ loggedIn }: { loggedIn: boolean }) {
  const router = useRouter();
  return (
    <motion.div
      className="flex items-center justify-center flex-col h-screen space-y-6 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Badge */}
      <motion.div
        className="bg-background flex items-center rounded-full border p-1 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex -space-x-1.5">
          <img
            className="ring-background rounded-full ring-1"
            src="https://originui.com/avatar-80-03.jpg"
            width={20}
            height={20}
            alt="Avatar 01"
          />
          <img
            className="ring-background rounded-full ring-1"
            src="https://originui.com/avatar-80-04.jpg"
            width={20}
            height={20}
            alt="Avatar 02"
          />
          <img
            className="ring-background rounded-full ring-1"
            src="https://originui.com/avatar-80-05.jpg"
            width={20}
            height={20}
            alt="Avatar 03"
          />
          <img
            className="ring-background rounded-full ring-1"
            src="https://originui.com/avatar-80-06.jpg"
            width={20}
            height={20}
            alt="Avatar 04"
          />
        </div>
        <p className="text-muted-foreground px-2 text-xs">
          Trusted by{" "}
          <strong className="text-foreground font-medium">60K+</strong> users.
        </p>
      </motion.div>
      {/* Primary text */}
      <motion.h1
        className="sm:text-5xl text-3xl font-bold font-dm_serif mt-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        Turn Customer Love <span className="text-primary">💖</span>
        <br /> into Trust-Driving Testimonials{" "}
        <span className="text-primary">⭐</span>
      </motion.h1>
      {/* Secondary text */}
      <motion.p
        className="sm:text-lg text-center text-base text-black/70 dark:text-white/70 max-w-2xl px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        Effortlessly collect, manage, and showcase testimonials with beautiful,
        <br />
        customizable pages that boost your product's credibility.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.5,
          delay: 0.6,
          scale: { type: "spring", stiffness: 400, damping: 10 },
        }}
      >
        <Button
          className="rounded-full group p-5"
          onClick={() => {
            if (loggedIn) {
              router.push("/dashboard");
            } else {
              router.push("/api/auth/signin");
            }
          }}
        >
          Get Started
          <ArrowRight
            className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-1"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </motion.div>
    </motion.div>
  );
}
