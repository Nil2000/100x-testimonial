import React from "react";
import Navbar from "@/components/navbar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 via-background to-background">
      <Navbar />
      <main className="pt-16 font-sans">
        <div className="container mx-auto px-4 md:px-6 py-6">{children}</div>
      </main>
    </div>
  );
}
