"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function PublicNavbar() {
  const searchParams = useSearchParams();
  console.log(searchParams);
  return (
    <div
      className={`flex space-x-2 font-bold gap-2 lg:max-w-[1000px] mx-auto w-full p-4 ${
        searchParams.has("wall-of-love") ? "justify-center" : ""
      }`}
    >
      <Image src={"/logo.svg"} alt="Logo" width={30} height={30} />
      <h2 className="text-center font-poppins sm:text-3xl flex items-center text-xl">
        100xTestimonials
      </h2>
    </div>
  );
}
