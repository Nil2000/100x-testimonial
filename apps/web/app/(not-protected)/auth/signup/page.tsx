import ThemeToggle from "@/components/theme-toggle";
import React from "react";

export default function page() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div>page</div>
    </div>
  );
}
