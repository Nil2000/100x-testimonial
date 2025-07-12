import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeroSection({ loggedIn }: { loggedIn: boolean }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center flex-col md:h-[80vh] h-screen space-y-6">
      <div className="bg-background flex items-center rounded-full border p-1 shadow-sm">
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
      </div>
      <h1 className="sm:text-5xl text-lg font-bold font-dm_serif mt-10 text-center">
        Turn Customer Love <span className="text-primary">💖</span>
        <br /> into Trust-Driving Testimonials{" "}
        <span className="text-primary">⭐</span>
      </h1>
      <p className="sm:text-lg text-center text-sm text-black/70 dark:text-white/70">
        Effortlessly collect, manage, and showcase testimonials with beautiful,
        <br />
        customizable pages that boost your product's credibility.
      </p>
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
    </div>
  );
}
