"use client";

import Image from "next/image";
import React from "react";
import { CollectionType } from "@/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { Pen, Video } from "lucide-react";
import ThankYouDialog from "./thanks-dialog";
import { Question, SpaceResponse } from "@/lib/types";
import RecordVideoDialog from "./record-video-dialog";
import UploadFileDialog from "./upload-file-dialog";
import SubmitTextFeedbackDialog from "./submit-text-feedback-dialog";
import SubmitVideoFeedbackDialog from "./submit-video-feedback-dialog";
import { usePostHog } from "posthog-js/react";
import { POSTHOG_METRIC_CLIENT_EVENTS } from "@/lib/constants";
import { THEME_CHOICES } from "@/components/theme-constant";
import RequestTestimonialPageNavbar from "./navbar";
import { useFont } from "@/hooks/useFont";
import { cx } from "class-variance-authority";

type PublicSpaceViewProps = {
  space: SpaceResponse;
};

export default function PublicSpaceView({ space }: PublicSpaceViewProps) {
  const [openThanks, setOpenThanks] = React.useState(false);
  const [openRecord, setOpenRecord] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openTextFeedback, setOpenTextFeedback] = React.useState(false);
  const [openSubmitFeedback, setOpenSubmitFeedback] = React.useState(false);
  const [videoFileBlob, setVideoFileBlob] = React.useState<Blob | null>(null);
  const posthog = usePostHog();
  const theme =
    space.theme && space.theme.theme
      ? THEME_CHOICES.find((t) => t.value === space.theme.theme)
      : undefined;
  const { fontSelected, handleFontSelect, fontList } = useFont();
  const effectiveFont = fontSelected;
  const showThanks = async () => {
    setOpenThanks(true);
    // await trackAction(space.id, "req-test-page");
    if (posthog) {
      const captureResponse = posthog.capture(
        POSTHOG_METRIC_CLIENT_EVENTS.TESTIMONIAL_SUBMITTED,
        {
          spaceId: space.id,
        }
      );
      console.log("PostHog captureResponse", captureResponse);
    } else {
      console.warn("PostHog not initialized");
    }
  };

  const handleUplaodFile = () => {
    setOpenRecord(false);
    setOpenUpload(true);
  };

  React.useEffect(() => {
    // Always load the font from theme options if available, regardless of theme selection
    if (space.theme?.themeOptions?.font) {
      handleFontSelect(space.theme.themeOptions.font);
    } else {
      // If no font is specified in theme options, use a default accessible font
      handleFontSelect("Roboto");
    }
  }, [space]);

  return (
    <div className={`min-h-screen ${theme?.bg}`}>
      <RequestTestimonialPageNavbar themeType={theme?.type || "default"} />
      <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)] py-10 md:py-14 px-4 relative">
        {/* Decorative Elements */}
        {theme && (
          <>
            <div
              className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-20 blur-2xl"
              style={{ background: theme.colorPalette[0] }}
            />
            <div
              className="absolute bottom-10 right-10 w-32 h-32 rounded-full opacity-20 blur-3xl"
              style={{ background: theme.colorPalette[1] }}
            />
          </>
        )}

        <div
          className={cx(
            "rounded-xl p-6 md:p-8 w-full max-w-lg flex flex-col gap-4 backdrop-blur-sm relative z-10 transition-all duration-300",
            theme
              ? `${theme.textClass} ${theme.border} ${theme.shadow} ${theme.alignment}`
              : "text-center border-2 bg-card/80 shadow-md"
          )}
          style={{
            fontFamily: `'${effectiveFont}', ${
              fontList.find((f) => f.family === effectiveFont)?.category ||
              "sans-serif"
            }`,
            background: theme ? theme.mainContainerBg : undefined,
          }}
        >
          {space.logo && space.theme?.themeOptions?.showBrandLogo && (
            <div className="flex justify-center mb-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-primary/20 shadow-md">
                <Image
                  src={space.logo}
                  alt="Brand Logo"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {space.headerTitle}
            </h1>
            <p
              className={cx(
                "text-sm md:text-base font-medium leading-relaxed",
                !theme ? "text-muted-foreground" : "opacity-80"
              )}
            >
              {space.headerSubtitle}
            </p>
          </div>
          <div className="space-y-3 mt-2">
            <div
              className={cx(
                "inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
                theme?.type === "dark" ? "bg-white/10" : "bg-black/5"
              )}
            >
              Questions
            </div>
            <ul
              className={cx(
                "space-y-2 text-sm pl-5",
                theme ? theme.listStyle : "list-disc",
                theme ? theme.alignment : "text-left"
              )}
              style={{
                listStyleType:
                  theme && theme.listStyle.includes("none")
                    ? "none"
                    : undefined,
              }}
            >
              {space.questions.map((question: Question) => (
                <li key={question.id} className="leading-relaxed">
                  {question.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3 mt-6 flex-col sm:flex-row justify-center">
            {(space.collectionType === CollectionType.VIDEO ||
              space.collectionType === CollectionType.TEXT_AND_VIDEO) && (
              <>
                <Button
                  type="button"
                  size="default"
                  onClick={() => setOpenRecord(true)}
                  className={cx(
                    "flex-1 sm:flex-none gap-2 font-medium shadow-sm",
                    theme ? `${theme.primaryButtonColor} text-white` : ""
                  )}
                >
                  <Video className="w-4 h-4" />
                  Record Video
                </Button>
                <RecordVideoDialog
                  open={openRecord}
                  onClose={() => setOpenRecord(false)}
                  handleFileUpload={handleUplaodFile}
                  onSubmitFeedback={(uploadFile: Blob) => {
                    setVideoFileBlob(uploadFile);
                    setOpenRecord(false);
                    setOpenSubmitFeedback(true);
                  }}
                />
              </>
            )}
            {(space.collectionType === CollectionType.TEXT ||
              space.collectionType === CollectionType.TEXT_AND_VIDEO) && (
              <>
                <Button
                  type="button"
                  size="default"
                  onClick={() => setOpenTextFeedback(true)}
                  className={cx(
                    "flex-1 sm:flex-none gap-2 font-medium shadow-sm",
                    theme ? theme.secondaryButtonColor : ""
                  )}
                  variant={!theme ? "secondary" : "default"}
                >
                  <Pen className="w-4 h-4" />
                  Write Text
                </Button>
                <SubmitTextFeedbackDialog
                  space={space}
                  showThankYou={showThanks}
                  open={openTextFeedback}
                  onOpenChange={() => {
                    setOpenTextFeedback(false);
                  }}
                />
              </>
            )}
          </div>
          <ThankYouDialog
            open={openThanks}
            onOpenChange={() => {
              setOpenThanks(false);
            }}
            title={space.thankyouSpace!.title}
            message={space.thankyouSpace!.message}
          />
          <UploadFileDialog
            open={openUpload}
            onClose={() => {
              setOpenUpload(false);
            }}
            onSubmitFeedback={(uploadFile: Blob) => {
              setVideoFileBlob(uploadFile);
              setOpenUpload(false);
              setOpenSubmitFeedback(true);
            }}
          />
          <SubmitVideoFeedbackDialog
            open={openSubmitFeedback}
            onClose={() => {
              setOpenSubmitFeedback(false);
            }}
            videoFileBlob={videoFileBlob}
            retakeVideo={() => {
              setOpenRecord(true);
            }}
            spaceName={space.name}
            spaceId={space.id}
            showThankYou={showThanks}
          />
        </div>
      </div>
    </div>
  );
}
