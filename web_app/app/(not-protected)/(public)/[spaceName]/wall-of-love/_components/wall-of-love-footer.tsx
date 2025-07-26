import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  spaceName: string;
};

export default function WallOfLoveFooter({ spaceName }: Props) {
  return (
    <div className="w-full h-[20rem] relative">
      <div className="absolute bg-gradient-to-b from-transparent to-white/80 dark:to-black/80 top-0 h-[8rem] w-full -mt-[8rem] " />
      <div className="h-full bg-white/80 dark:bg-black/80 flex flex-col gap-y-5 w-full items-center justify-center">
        <h5 className="font-dm_serif text-4xl">Wanna add yours?</h5>
        <Link href={`/${spaceName}`}>
          <Button>
            Submit here
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
        <Link href={`/`}>
          <Button variant={"link"}>Build your own wall of love?</Button>
        </Link>
      </div>
    </div>
  );
}
