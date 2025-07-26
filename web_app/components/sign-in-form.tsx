"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  return (
    <Card className="font-sans text-center">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            signIn("google");
          }}
        >
          Sign In with Google
        </Button>
      </CardContent>
    </Card>
  );
}
