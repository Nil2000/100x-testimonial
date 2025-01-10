"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full h-max absolute top-0">
      <nav className="w-full bg-transparent text-foreground  lg:w-[1000px] h-10 flex justify-center px-2 shadow mx-auto font-sans">
        <div className="flex items-center justify-between h-min w-full py-5">
          <div className="flex items-center space-x-2 font-bold gap-2">
            <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
            <h2 className="text-center font-dm_serif sm:text-3xl">
              100xTestimonials
            </h2>
          </div>
          <Button
            onClick={() => {
              router.push("/auth/signin");
            }}
            className="group"
          >
            Sign In
            <ArrowRight
              className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Button>
        </div>
      </nav>
    </div>
  );
}
