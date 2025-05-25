"use client";

import Image from "next/image";
import React from "react";
import { CollectionType } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Pen, Video } from "lucide-react";
import ThankYouDialog from "./thanks-dialog";
import { SpaceResponse } from "@/lib/types";
import RecordVideoDialog from "./record-video-dialog";
import UploadFileDialog from "./upload-file-dialog";
import SubmitTextFeedbackDialog from "./submit-text-feedback-dialog";
import SubmitVideoFeedbackDialog from "./submit-video-feedback-dialog";
import { usePostHog } from "posthog-js/react";
import { POSTHOG_METRIC_CLIENT_EVENTS, THEME_CHOICES } from "@/lib/constants";
import RequestTestimonialPageNavbar from "./navbar";
import { useFont } from "@/hooks/use-font";
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
  const theme = space.themeForRequestTestimonials.theme
    ? THEME_CHOICES.find(
        (t) => t.value === space.themeForRequestTestimonials.theme
      )
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
    if (space.themeForRequestTestimonials.themeOptions?.customFont) {
      handleFontSelect(
        space.themeForRequestTestimonials.themeOptions.customFont
      );
    }
  }, [space]);

  return (
    <div className={`min-h-screen ${theme?.bg}`}>
      <RequestTestimonialPageNavbar themeType={theme?.type || "default"} />
      <div className="lg:max-w-[1000px] w-full flex flex-col justify-center items-center mx-auto space-y-8 h-[calc(100vh-4.5rem)]">
        <div
          className={cx(
            "rounded-lg p-8 w-full max-w-md flex flex-col gap-4 overflow-y-auto",
            theme
              ? theme.textClass +
                  " " +
                  theme.border +
                  " " +
                  theme.shadow +
                  " " +
                  theme.alignment
              : "text-center"
          )}
          style={{
            fontFamily: `'${effectiveFont}', ${
              fontList.find((f) => f.family === effectiveFont)?.category ||
              "sans-serif"
            }`,
            background: theme ? theme.mainContainerBg : undefined,
          }}
        >
          {space.logo &&
            space.themeForRequestTestimonials.themeOptions.showBrandLogo && (
              <div className="flex justify-center mb-4">
                <Image
                  src={space.logo}
                  alt="Public space"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
            )}
          <h1 className="text-4xl font-bold text-center">
            {space.headerTitle}
          </h1>
          <p className="text-center text-xl text-muted-foreground">
            {space.headerSubtitle}
          </p>
          <h2 className="uppercase font-semibold leading-6 mb-4">Questions</h2>
          <ul
            className={`mb-4 text-sm pl-3 ${
              theme ? theme.listStyle : "list-square"
            } ${theme ? theme.alignment : "text-left"}`}
            style={{
              listStyleType:
                theme && theme.listStyle.includes("none") ? "none" : undefined,
            }}
          >
            {space.questions.map((question: any) => (
              <li key={question.id} className="text-muted-foreground">
                {question.title}
              </li>
            ))}
          </ul>
          <div className="flex justify-center space-x-2">
            {(space.collectionType === CollectionType.VIDEO ||
              space.collectionType === CollectionType.TEXT_AND_VIDEO) && (
              <>
                <Button
                  onClick={() => setOpenRecord(true)}
                  className={cx(
                    theme ? `${theme.primaryButtonColor} text-white` : "",
                    "group"
                  )}
                >
                  <Video
                    className="me-1 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <h2>Record a video</h2>
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
                  className={cx(
                    theme ? `${theme.secondaryButtonColor} text-white` : ""
                  )}
                  variant={!theme ? "secondary" : "default"}
                  onClick={() => setOpenTextFeedback(true)}
                >
                  <Pen
                    className="me-1 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <h2>Write as text</h2>
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
