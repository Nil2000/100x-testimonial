"use client";

import Link from "next/link";
import React from "react";

export default function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4 h-full mt-10">
      <h1 className="text-4xl">🫠</h1>
      <h2 className="font-bold font-dm_serif text-5xl">
        Sorry That page doesn’t exist.{" "}
      </h2>
      <p className="text-muted-foreground">
        Head to our{" "}
        <Link
          href={"/"}
          className="font-semibold hover:underline text-foreground underline-offset-4"
        >
          homepage
        </Link>{" "}
        that does exist, or try double-checking the URL.
      </p>
    </div>
  );
}
