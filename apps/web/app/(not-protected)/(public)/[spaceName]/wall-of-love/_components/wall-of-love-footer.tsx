import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  spaceName: string;
};

export default function WallOfLoveFooter({ spaceName }: Props) {
  return (
    <div className="w-full min-h-[22rem] relative mt-12">
      <div className="absolute bg-gradient-to-b from-transparent to-white/80 dark:to-black/80 top-0 h-[8rem] w-full -mt-[8rem]" />
      <div className="h-full bg-white/80 dark:bg-black/80 flex flex-col gap-y-6 w-full items-center justify-center py-12 px-4">
        <div className="text-center space-y-3 max-w-xl">
          <MessageSquareHeart className="w-10 h-10 text-primary mx-auto mb-2" />
          <h5 className="font-dm_serif text-3xl sm:text-4xl font-bold">
            Want to add yours?
          </h5>
          <p className="text-muted-foreground font-poppins text-sm sm:text-base">
            Share your experience and help others make informed decisions
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <Link href={`/${spaceName}`}>
            <Button size="lg" className="shadow-md">
              Submit Your Feedback
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link href={`/`}>
            <Button variant="outline" size="lg" className="shadow-sm">
              Build Your Own Wall of Love
            </Button>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-border w-full max-w-xl">
          <p className="text-center text-xs text-muted-foreground font-poppins">
            Powered by 100x Testimonial
          </p>
        </div>
      </div>
    </div>
  );
}
