"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { CollectionType } from "@repo/db/enums";
import ThankYouDialog from "./thanks-dialog";
import { SpaceResponse } from "@/lib/types";
import RecordVideoDialog from "./record-video-dialog";
import UploadFileDialog from "./upload-file-dialog";
import SubmitTextFeedbackDialog from "./submit-text-feedback-dialog";
import SubmitVideoFeedbackDialog from "./submit-video-feedback-dialog";
import { usePostHog } from "posthog-js/react";
import { POSTHOG_METRIC_CLIENT_EVENTS } from "@/lib/constants";
import { THEME_CHOICES } from "@/components/theme-constant";
import { useFont } from "@/hooks/useFont";
import { useIsClient } from "@/hooks/useIsClient";
import CollectionPageView from "@/components/collection-page/collection-page-view";

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
        },
      );
      console.log("PostHog captureResponse", captureResponse);
    } else {
      console.warn("PostHog not initialized");
    }
  };
  const mounted = useIsClient();

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

  if (!mounted) {
    return <Loader2 className="w-4 h-4 animate-spin" />;
  }

  return (
    <>
      <CollectionPageView
        headerTitle={space.headerTitle}
        headerSubtitle={space.headerSubtitle}
        logo={space.logo}
        showBrandLogo={Boolean(space.theme?.themeOptions?.showBrandLogo)}
        questions={space.questions}
        collectionType={space.collectionType as CollectionType}
        theme={theme}
        fontFamily={`'${effectiveFont}', ${
          fontList.find((f) => f.family === effectiveFont)?.category ||
          "sans-serif"
        }`}
        onRecordVideo={() => setOpenRecord(true)}
        onWriteText={() => setOpenTextFeedback(true)}
      />
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
      <SubmitTextFeedbackDialog
        space={space}
        showThankYou={showThanks}
        open={openTextFeedback}
        onOpenChange={() => {
          setOpenTextFeedback(false);
        }}
      />
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
    </>
  );
}
