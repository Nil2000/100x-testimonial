import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

export default function WallOfLoveFooter() {
  return (
    <div className="w-full h-[30rem] relative">
      <div className="absolute bg-gradient-to-b from-transparent to-black/80 top-0 h-[10rem] w-full -mt-[10rem] " />
      <div className="h-full bg-black/80 flex flex-col gap-y-5 w-full items-center justify-center">
        <h5 className="font-dm_serif text-4xl">Wanna add yours?</h5>
        <Button>
          Try it now
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
