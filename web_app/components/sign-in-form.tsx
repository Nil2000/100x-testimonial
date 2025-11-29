"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function SignInForm() {
  return (
    <Card className="font-sans text-center">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={async () => {
            try {
              toast.loading("Signing in...");
              const result = await signIn("google");
              if (result?.error) {
                toast.error("Failed to sign in. Please try again.");
              }
            } catch (error) {
              toast.error("Failed to sign in. Please try again.");
            }
          }}
        >
          Sign In with Google
        </Button>
      </CardContent>
    </Card>
  );
}
