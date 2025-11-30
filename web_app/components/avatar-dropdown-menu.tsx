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

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Paintbrush,
  Sparkles,
  Sun,
  UserPen,
} from "lucide-react";
import Link from "next/link";
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
  const { setTheme, theme } = useTheme();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-1.5 hover:bg-muted rounded-full gap-2 transition-colors"
        >
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={imageUrl} alt="Profile image" />
            <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <ChevronDown
            size={14}
            strokeWidth={2}
            className="opacity-50 hidden sm:block"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 font-sans"
        align="end"
        sideOffset={8}
      >
        {/* User Info */}
        <DropdownMenuLabel className="flex items-center gap-3 p-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={imageUrl} alt="Profile image" />
            <AvatarFallback className="text-sm font-medium bg-primary/10 text-primary">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-foreground">
              {name}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Mobile Navigation Links */}
        <div className="md:hidden">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard" className="cursor-pointer">
                <LayoutDashboard size={16} className="opacity-60" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/buy-premium" className="cursor-pointer">
                <Sparkles size={16} className="opacity-60" />
                Upgrade Plan
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
        </div>

        {/* Theme Selector */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Paintbrush size={16} className="opacity-60" />
            Theme
            <span className="ml-auto text-xs text-muted-foreground capitalize">
              {theme}
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="gap-2"
            >
              <Monitor size={14} className="opacity-60" />
              System
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="gap-2"
            >
              <Sun size={14} className="opacity-60" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="gap-2"
            >
              <Moon size={14} className="opacity-60" />
              Dark
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Settings */}
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-2">
            <UserPen size={16} className="opacity-60" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={() => signOut()}
          className="gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          <LogOut size={16} className="opacity-60" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
