import type { Feedback, Prisma } from "@/generated/prisma/client";
import type { SpaceResponse, TestimonialResponse } from "@/lib/types";

export type PublicSpaceRecord = Prisma.SpaceGetPayload<{
  select: typeof publicSpaceSelect;
}>;

export const publicSpaceSelect = {
  id: true,
  name: true,
  logo: true,
  headerTitle: true,
  headerSubtitle: true,
  collectionType: true,
  collectStar: true,
  theme: true,
  questions: {
    select: {
      id: true,
      title: true,
    },
    orderBy: {
      order: "asc" as const,
    },
  },
  thankyouSpace: {
    select: {
      title: true,
      message: true,
    },
  },
} satisfies Prisma.SpaceSelect;

export const publishedSpaceByNameWhere = {
  deletedAt: null,
  isPublished: true,
} as const;

export function getPublicSpaceSelect() {
  return publicSpaceSelect;
}

export type WallOfLoveSettings = {
  style: string;
  styleOptions: {
    columns?: string;
    rows?: string;
    cardVariant?: string;
    showRating?: string;
    showDate?: string;
    gap?: string;
  };
};

export function getWallOfLoveSettings(theme: unknown): WallOfLoveSettings {
  const record = theme as Record<string, unknown> | null;
  const settings = record?.wallOfLove as WallOfLoveSettings | undefined;

  return (
    settings ?? {
      style: "list",
      styleOptions: { columns: "3" },
    }
  );
}

/** Strip internal theme keys not needed on public collection pages. */
export function sanitizePublicTheme(theme: unknown) {
  if (!theme || typeof theme !== "object" || Array.isArray(theme)) {
    return theme;
  }

  const record = { ...(theme as Record<string, unknown>) };
  delete record.wallOfLove;
  return record;
}

export function toPublicSpace(space: PublicSpaceRecord): SpaceResponse {
  return {
    id: space.id,
    name: space.name,
    logo: space.logo,
    headerTitle: space.headerTitle,
    headerSubtitle: space.headerSubtitle,
    collectionType: space.collectionType,
    collectStar: space.collectStar,
    questions: space.questions,
    thankyouSpace: space.thankyouSpace,
    theme: sanitizePublicTheme(space.theme),
  };
}

/** Fields safe to expose on public wall, embed, and share pages. */
export function toPublicTestimonial(feedback: Feedback): TestimonialResponse {
  return {
    id: feedback.id,
    answer: feedback.answer,
    name: feedback.name,
    email: "",
    rating: feedback.rating,
    permission: feedback.permission,
    spaceId: feedback.spaceId,
    createdAt: feedback.createdAt,
    updatedAt: feedback.updatedAt,
    feedbackType: feedback.feedbackType,
    addToWallOfLove: feedback.addToWallOfLove,
    videoUrl: feedback.videoUrl,
    imageUrl: feedback.imageUrl,
    profileImageUrl: feedback.profileImageUrl,
    isSpam: false,
    spamStatus: "COMPLETED",
    isSocial: feedback.isSocial,
    sentiment: feedback.sentiment,
    sentimentStatus: "COMPLETED",
    source: feedback.source,
    sourceUrl: feedback.sourceUrl,
    metadata: null,
    styleSettings:
      feedback.styleSettings as TestimonialResponse["styleSettings"],
  };
}
