import Image from "next/image";
import React from "react";

export default function ImagePrview({
  selectedFile,
}: {
  selectedFile: File | null;
}) {
  return (
    <>
      {selectedFile ? (
        <Image
          src={URL.createObjectURL(selectedFile).toString()}
          width={60}
          height={60}
          alt="company_logo"
        />
      ) : (
        <Image src={"/logo.svg"} width={60} height={60} alt="logo" />
      )}
    </>
  );
}
