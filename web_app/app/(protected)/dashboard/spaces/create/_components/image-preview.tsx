import Image from "next/image";
import React from "react";

export default function ImagePrview({
  selectedFile,
}: {
  selectedFile: File | null;
}) {
  return (
    <div className="relative h-16 w-16 rounded-xl overflow-hidden border-2 border-background shadow-lg bg-background">
      {selectedFile ? (
        <Image
          src={URL.createObjectURL(selectedFile).toString()}
          fill
          className="object-cover"
          alt="company_logo"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-muted">
          <Image
            src="/logo.svg"
            width={40}
            height={40}
            alt="logo"
            className="opacity-50"
          />
        </div>
      )}
    </div>
  );
}
