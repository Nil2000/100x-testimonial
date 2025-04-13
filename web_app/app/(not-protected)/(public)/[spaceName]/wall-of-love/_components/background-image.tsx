import Image from "next/image";
import React from "react";

export default function BackgroundImage() {
  return (
    <div className="absolute top-0 -z-10 w-full lg:w-[1000px]">
      <div className="relative h-max">
        <Image
          src="https://images.unsplash.com/photo-1524601500432-1e1a4c71d692?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Wall of love"
          width={1974}
          height={400}
          className="-z-20 object-cover w-full lg:w-[1000px] h-[40vh]"
        />
        <div className="absolute top-0 h-16 w-full z-10 bg-gradient-to-b from-zinc-900 via-zinc-900/30 to-transparent"></div>
        <div className="absolute top-0 left-0 w-40 h-full z-10 bg-gradient-to-r from-zinc-900 via-zinc-900/40 to-transparent"></div>
        <div className="absolute top-0 right-0 w-40 h-full z-10 bg-gradient-to-l from-zinc-900 via-zinc-900/30 to-transparent"></div>
        <div className="absolute bottom-0 h-32 w-full z-10 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent"></div>
      </div>
    </div>
  );
}
