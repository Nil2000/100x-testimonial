import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Code2, Image, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function ShareButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Open edit menu"
          className="text-muted-foreground hover:text-primary"
        >
          <Share2 size={16} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="font-sans ">
        <DropdownMenuItem>
          <Image size={16} /> Create image
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Code2 size={16} /> Embed testimonial
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
