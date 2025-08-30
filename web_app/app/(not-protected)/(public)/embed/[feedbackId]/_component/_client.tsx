import { TestimonialResponse } from "@/lib/types";
import React from "react";
import { UserRound } from "lucide-react";

type PublicEmbedProps = {
  feedback: TestimonialResponse & {
    styleSettings: any;
  };
};

export default function PublicEmbed({ feedback }: PublicEmbedProps) {
  // Default style settings if none are saved
  const defaultStyles = {
    alignment: "left",
    padding: 10,
    borderRadius: "medium",
    showBorder: true,
    borderColor: "#000000",
    borderThickness: 1,
    shadowType: "none",
    shadowSize: "small",
    shadowColor: "#000000",
    background: "#ffffff",
    gradient: "",
    backgroundType: "solid",
    cardBackground: "#ffffff",
    cardBackgroundType: "solid",
    headerColor: "#000000",
    bodyColor: "#000000",
    headerSize: 20,
    bodySize: 16,
    headerFont: "",
    bodyFont: "",
  };

  // Merge saved settings with defaults
  const styles = { ...defaultStyles, ...feedback.styleSettings };

  return (
    <div
      className={`flex justify-center items-center w-full
        ${styles.backgroundType === "gradient" ? styles.gradient : ""}
      `}
      style={{
        aspectRatio: "auto",
        textAlign: styles.alignment as "left" | "center" | "right",
        padding: `${styles.padding}px`,
        backgroundColor:
          styles.backgroundType === "solid"
            ? styles.background
            : styles.backgroundType === "transparent"
            ? "transparent"
            : "transparent",
      }}
    >
      <div
        className={`p-4 border-2 rounded-md h-min w-full space-y-2`}
        style={{
          backgroundColor:
            styles.cardBackgroundType === "solid"
              ? styles.cardBackground
              : styles.cardBackgroundType === "transparent"
              ? "transparent"
              : "transparent",
          border: styles.showBorder
            ? `${styles.borderThickness}px solid ${styles.borderColor}`
            : "none",
          borderRadius:
            styles.borderRadius === "small"
              ? "5px"
              : styles.borderRadius === "medium"
              ? "10px"
              : "15px",
          boxShadow:
            styles.shadowType === "none"
              ? "none"
              : styles.shadowType === "standard"
              ? styles.shadowSize === "small"
                ? `0 4px 6px -1px ${styles.shadowColor}40, 0 2px 4px -2px ${styles.shadowColor}40`
                : styles.shadowSize === "medium"
                ? `0 10px 15px -3px ${styles.shadowColor}40, 0 4px 6px -4px ${styles.shadowColor}40`
                : `0 25px 50px -12px ${styles.shadowColor}40`
              : styles.shadowSize === "small"
              ? `3px 3px 0 0 ${styles.shadowColor}`
              : styles.shadowSize === "medium"
              ? `6px 6px 0 0 ${styles.shadowColor}`
              : `9px 9px 0 0 ${styles.shadowColor}`,
          color: styles.bodyColor,
          fontFamily: styles.bodyFont,
        }}
      >
        <div
          className="flex items-center gap-3"
          style={{
            justifyContent:
              styles.alignment === "left"
                ? "flex-start"
                : styles.alignment === "center"
                ? "center"
                : styles.alignment === "right"
                ? "flex-end"
                : "center",
          }}
        >
          {feedback.profileImageUrl ? (
            <img
              src={feedback.profileImageUrl}
              alt="User Image"
              className="rounded-full w-10 h-10 object-cover"
              width={40}
              height={40}
            />
          ) : (
            <div className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center text-gray-600">
              <UserRound size={20} />
            </div>
          )}
          <h3
            className="font-bold"
            style={{
              color: styles.headerColor,
              fontSize: `${styles.headerSize}px`,
              fontFamily: styles.headerFont,
            }}
          >
            {feedback.name}
          </h3>
        </div>
        {!feedback.isSocial && (
          <p>{renderStars(feedback.rating)}</p>
        )}
        <div
          style={{
            fontSize: `${styles.bodySize}px`,
            fontFamily: styles.bodyFont,
          }}
        >
          {feedback.answer}
        </div>
      </div>
    </div>
  );
}

const renderStars = (rating: number) => {
  return Array.from({ length: rating }, (_, index) => (
    <span key={index}>⭐</span>
  ));
};
