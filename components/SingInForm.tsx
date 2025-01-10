"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function SingInForm() {
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
