"use client";
import Image from "next/image";
import React from "react";
type Props = {
  themeType: string | null;
};

export default function RequestTestimonialPageNavbar({ themeType }: Props) {
  console.log(themeType);
  return (
    <div
      className={`flex space-x-2 font-bold gap-2 lg:max-w-[1000px] mx-auto w-full p-4 bg-transparent border-b ${
        themeType === "default"
          ? "text-foreground border-b-muted-foreground"
          : themeType === "dark"
          ? " text-white border-b-white"
          : " text-black border-b-black"
      }`}
    >
      <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
      <h2 className="text-center font-poppins sm:text-3xl flex items-center text-xl">
        100xTestimonials
      </h2>
    </div>
  );
}
