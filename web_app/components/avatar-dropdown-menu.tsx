"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, LogOut, Paintbrush, UserPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export default function AvatarDropdownMenu({
  name,
  email,
  imageUrl,
}: {
  name: string;
  email: string;
  imageUrl: string;
}) {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={imageUrl} alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
          <ChevronDown
            size={16}
            strokeWidth={2}
            className="ms-2 opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 font-sans">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Paintbrush
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => {
                setTheme("system");
              }}
            >
              System
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("light");
              }}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setTheme("dark");
              }}
            >
              Dark
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserPen
              size={16}
              strokeWidth={2}
              className="opacity-60"
              aria-hidden="true"
            />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
          className="text-destructive dark:focus:bg-destructive/40 focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
