import SignInForm from "@/components/sign-in-form";
import ThemeToggle from "@/components/theme-toggle";
import React from "react";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}
