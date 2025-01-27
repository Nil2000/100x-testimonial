"use client";
import React from "react";
import CreateSpaceForm from "./create-space-form";
import { Button } from "@/components/ui/button";
import PreviewSpace from "./preview-space";
import { Loader } from "lucide-react";
import { sampleQuestions } from "@/lib/constants";
import { CreateSpaceQuestion } from "@/lib/types";

export default function CreateSpacePage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [fileSelected, setFileSelected] = React.useState<File | null>(null);
  const [headerTitlePreview, setHeaderTitlePreview] =
    React.useState<string>("");
  const [customMessagePreview, setCustomMessagePreview] =
    React.useState<string>("");
  const [questionsPreview, setQuestionsPreview] =
    React.useState<CreateSpaceQuestion[]>(sampleQuestions);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return <Loader className="w-8 h-8 mx-auto mt-8 animate-spin" />;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl w-full text-center font-bold">
        Create a new space
      </h1>
      <p className="text-center mt-4 text-sm text-foreground/40">
        After the Space is created, it will generate a dedicated page for
        collecting testimonials.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 px-6 mt-5 gap-8">
        <PreviewSpace
          selectedFile={fileSelected}
          headerTitle={headerTitlePreview}
          customMessage={customMessagePreview}
          questions={questionsPreview}
        />
        <CreateSpaceForm
          setFileSelected={setFileSelected}
          isFileSelected={fileSelected}
          setHeaderTitlePreview={setHeaderTitlePreview}
          setCustomMessagePreview={setCustomMessagePreview}
          setQuestionsPreview={setQuestionsPreview}
        />
      </div>
      {/* <div className="w-full flex justify-center">
        <Button className="mt-4 sm:w-1/3 w-full">Create Space</Button>
      </div> */}
    </div>
  );
}
