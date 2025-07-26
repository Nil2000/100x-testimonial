import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import AvatarDropdownMenu from "./avatar-dropdown-menu";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="w-full h-max absolute top-0">
      <nav className="w-full bg-zinc-100 dark:bg-zinc-900 text-foreground  lg:w-[1000px] h-max flex justify-center px-2 shadow mx-auto font-sans ">
        <div className="flex items-center justify-between h-min w-full py-5">
          <div className="flex space-x-2 font-bold gap-2">
            <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
            <h2 className="text-center font-poppins sm:text-3xl flex items-center">
              100xTestimonials
            </h2>
          </div>
          {!session?.user ? (
            <Button className="group">
              <Link
                href="/api/auth/signin"
                className="flex items-center space-x-1"
              >
                Sign In
                <ArrowRight
                  className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </Button>
          ) : (
            <AvatarDropdownMenu
              name={session.user.name || "User"}
              email={session.user.email || "example@gmail.com"}
              imageUrl={session.user.image || "/avatar.svg"}
            />
          )}
        </div>
      </nav>
    </div>
  );
}
