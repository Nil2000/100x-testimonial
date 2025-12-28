"use client";
import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Session } from "next-auth";
import AvatarDropDownMenu from "./avatar-dropdown-menu";
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
  return (
    <motion.div
      ref={ref}
      className={cn(
        "w-full h-16 fixed inset-x-0 top-0 z-40 mx-auto flex items-center p-4 justify-between",
        visible && "px-4"
      )}
      animate={{
        y: visible ? "3rem" : 0,
        width: visible ? "80%" : "100%",
        borderRadius: visible ? "4rem" : "0",
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
      }}
      transition={{
        type: "tween",
      }}
    >
      <div className="flex space-x-4 font-bold">
        <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
        <h2 className="text-center font-poppins sm:text-2xl flex items-center">
          100xTestimonials
        </h2>
      </div>
      <ul className="flex space-x-4 -ml-52">
        <li>Features</li>
        <li>Pricing</li>
        <li>Contact</li>
      </ul>
      <div className="flex space-x-4 font-bold">
        {!session?.user ? (
          <Button className="group rounded-full p-5">
            <Link
              href="/api/auth/signin"
              className="flex items-center space-x-1"
            >
              Get Started
              <ArrowRight
                className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
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
