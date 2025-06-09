import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type BackgroundImageContainerProps = {
  children?: React.ReactNode;
};

export default function BackgroundImageContainer({
  children,
}: BackgroundImageContainerProps) {
  return (
    <div className="relative top-0 w-full lg:w-[1000px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Wall of love"
        width={1974}
        height={400}
        className="-z-20 object-cover w-full lg:w-[1000px] sm:h-[60vh] h-[30vh] rounded-md"
      />
      <div className="absolute top-0 left-0 w-full h-full rounded-md z-10 p-2">
        {children}
      </div>
    </div>
  );
}
