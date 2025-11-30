"use client";
import React from "react";
import CreateSpaceForm from "./create-space-form";
import PreviewSpace from "./preview-space";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { sampleQuestions } from "@/lib/constants";
import { CreateSpaceQuestion } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CollectionType } from "@/generated/prisma/enums";

export default function CreateSpacePage() {
  const [isMounted, setIsMounted] = React.useState(false);
  const [fileSelected, setFileSelected] = React.useState<File | null>(null);
  const [headerTitlePreview, setHeaderTitlePreview] =
    React.useState<string>("");
  const [customMessagePreview, setCustomMessagePreview] =
    React.useState<string>("");
  const [questionsPreview, setQuestionsPreview] =
    React.useState<CreateSpaceQuestion[]>(sampleQuestions);
  const [collectionTypePreview, setCollectionTypePreview] =
    React.useState<CollectionType>(CollectionType.TEXT);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 mb-4 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create a New Space
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Set up your testimonial collection space. Once created, you&apos;ll
          get a dedicated page where your customers can submit their feedback.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Preview Section - Sticky on desktop */}
        <div className="lg:col-span-2 order-2 lg:order-1">
          <div className="lg:sticky lg:top-24">
            <PreviewSpace
              selectedFile={fileSelected}
              headerTitle={headerTitlePreview}
              customMessage={customMessagePreview}
              questions={questionsPreview}
              collectionType={collectionTypePreview}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <CreateSpaceForm
            setFileSelected={setFileSelected}
            isFileSelected={fileSelected}
            setHeaderTitlePreview={setHeaderTitlePreview}
            setCustomMessagePreview={setCustomMessagePreview}
            setQuestionsPreview={setQuestionsPreview}
            setCollectionTypePreview={setCollectionTypePreview}
          />
        </div>
      </div>
    </div>
  );
}
