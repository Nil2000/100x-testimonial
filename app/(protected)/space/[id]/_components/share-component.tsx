import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code2, Image, Share2 } from "lucide-react";

type Props = {
  type: "TEXT" | "VIDEO";
  handleShareImage: () => void;
  handleEmbedTestimonial: () => void;
};

export default function ShareButton({
  type,
  handleShareImage,
  handleEmbedTestimonial,
}: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open edit menu"
          className="text-muted-foreground hover:text-primary"
        >
          <Share2 size={16} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-sans ">
        {type === "TEXT" && (
          <DropdownMenuItem
            onClick={() => {
              handleShareImage();
            }}
          >
            <Image size={16} /> Share as image
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={() => {
            handleEmbedTestimonial();
          }}
        >
          <Code2 size={16} /> Embed testimonial
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
