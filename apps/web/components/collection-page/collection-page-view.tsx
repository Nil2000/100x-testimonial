"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { CollectionType } from "@repo/db/enums";
import { cx } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { Pen, Video } from "lucide-react";
import type { Theme } from "@/components/theme-constant";
import CollectionPageNavbar from "./navbar";

export type CollectionPageQuestion = {
  id: string;
  title: string;
};

export type CollectionPageViewProps = {
  headerTitle: string;
  headerSubtitle: string;
  logo: string | null;
  showBrandLogo: boolean;
  questions: CollectionPageQuestion[];
  collectionType: CollectionType;
  theme: Theme | undefined;
  fontFamily: string;
  /** Omit to render an inert (disabled) button, e.g. in a settings preview. */
  onRecordVideo?: () => void;
  onWriteText?: () => void;
  navbarBadge?: ReactNode;
  wrapperClassName?: string;
  contentClassName?: string;
};

/**
 * Renders the testimonial collection card shown to public visitors at
 * `/{spaceName}`. Shared by the public route and the admin theme settings
 * preview so both stay in sync with real questions, collection type, and
 * branding instead of drifting apart as hand-written copies.
 */
export default function CollectionPageView({
  headerTitle,
  headerSubtitle,
  logo,
  showBrandLogo,
  questions,
  collectionType,
  theme,
  fontFamily,
  onRecordVideo,
  onWriteText,
  navbarBadge,
  wrapperClassName,
  contentClassName,
}: CollectionPageViewProps) {
  const showsVideo =
    collectionType === CollectionType.VIDEO ||
    collectionType === CollectionType.TEXT_AND_VIDEO;
  const showsText =
    collectionType === CollectionType.TEXT ||
    collectionType === CollectionType.TEXT_AND_VIDEO;

  return (
    <div
      className={cx(
        "transition-all duration-300",
        theme?.bg ?? "bg-gradient-to-br from-background to-muted/20",
        wrapperClassName ?? "min-h-screen",
      )}
    >
      <CollectionPageNavbar themeType={theme?.type ?? "default"} badge={navbarBadge} />
      <div
        className={cx(
          "flex justify-center items-center py-10 md:py-14 px-4 relative",
          contentClassName ?? "min-h-[calc(100vh-4.5rem)]",
        )}
      >
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
              : "text-center border-2 bg-card/80 shadow-md",
          )}
          style={{
            fontFamily,
            background: theme?.mainContainerBg,
          }}
        >
          {showBrandLogo && logo && (
            <div className="flex justify-center mb-3">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-primary/20 shadow-md">
                <Image
                  src={logo}
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
              {headerTitle}
            </h1>
            <p
              className={cx(
                "text-sm md:text-base font-medium leading-relaxed",
                !theme ? "text-muted-foreground" : "opacity-80",
              )}
            >
              {headerSubtitle}
            </p>
          </div>
          <div className="space-y-3 mt-2">
            <div
              className={cx(
                "inline-block px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider",
                theme?.type === "dark" ? "bg-white/10" : "bg-black/5",
              )}
            >
              Questions
            </div>
            <ul
              className={cx(
                "space-y-2 text-sm pl-5",
                theme ? theme.listStyle : "list-disc",
                theme ? theme.alignment : "text-left",
              )}
              style={{
                listStyleType: theme?.listStyle.includes("none")
                  ? "none"
                  : undefined,
              }}
            >
              {questions.map((question) => (
                <li key={question.id} className="leading-relaxed">
                  {question.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3 mt-6 flex-col sm:flex-row justify-center">
            {showsVideo && (
              <Button
                type="button"
                size="default"
                disabled={!onRecordVideo}
                onClick={onRecordVideo}
                className={cx(
                  "flex-1 sm:flex-none gap-2 font-medium shadow-sm",
                  theme ? `${theme.primaryButtonColor} text-white` : "",
                )}
              >
                <Video className="w-4 h-4" />
                Record Video
              </Button>
            )}
            {showsText && (
              <Button
                type="button"
                size="default"
                disabled={!onWriteText}
                onClick={onWriteText}
                variant={!theme ? "secondary" : "default"}
                className={cx(
                  "flex-1 sm:flex-none gap-2 font-medium shadow-sm",
                  theme ? theme.secondaryButtonColor : "",
                )}
              >
                <Pen className="w-4 h-4" />
                Write Text
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
