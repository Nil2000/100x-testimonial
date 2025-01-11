"use client";
import React from "react";
import CreateSpaceForm from "./create-space-form";

export default function CreateSpacePage() {
  return (
    <>
      <h1 className="text-3xl w-full text-center font-bold">
        Create a new space
      </h1>
      <p className="text-center mt-4 text-sm text-foreground/40">
        After the Space is created, it will generate a dedicated page for
        collecting testimonials.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 px-2">
        <div></div>
        <CreateSpaceForm />
      </div>
    </>
  );
}
