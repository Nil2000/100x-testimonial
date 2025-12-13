import SignInForm from "@/components/sign-in-form";
import React from "react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 px-4 py-12">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}
