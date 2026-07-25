import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { toPublicTestimonial } from "@/lib/publicData";
import type { Feedback, Space, ThankYouSpace } from "@/generated/prisma/client";
import type { TestimonialResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";

export type GuardError = { error: string };

export type AuthContext = {
  userId: string;
  session: Session;
};

export async function requireAuth(): Promise<AuthContext | GuardError> {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  return { userId: session.user.id, session };
}

export function unauthorizedJsonResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function forbiddenJsonResponse(message = "Forbidden") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export async function requireAuthApi(): Promise<
  AuthContext | { response: NextResponse }
> {
  const result = await requireAuth();

  if ("error" in result) {
    return { response: unauthorizedJsonResponse() };
  }

  return result;
}

export async function getOwnedSpace(userId: string, spaceId: string) {
  return db.space.findFirst({
    where: {
      id: spaceId,
      createdById: userId,
      deletedAt: null,
    },
  });
}

export async function assertSpaceOwnership(
  userId: string,
  spaceId: string
): Promise<{ space: Space } | GuardError> {
  const space = await getOwnedSpace(userId, spaceId);

  if (!space) {
    return { error: "Space not found or unauthorized" };
  }

  return { space };
}

export async function assertSpaceOwnershipByName(
  userId: string,
  spaceName: string
): Promise<{ space: Space } | GuardError> {
  const space = await db.space.findFirst({
    where: {
      name: spaceName,
      createdById: userId,
      deletedAt: null,
    },
  });

  if (!space) {
    return { error: "Space not found or unauthorized" };
  }

  return { space };
}

export async function assertFeedbackOwnership(
  userId: string,
  feedbackId: string
): Promise<{ feedback: Feedback & { space: Space } } | GuardError> {
  const feedback = await db.feedback.findFirst({
    where: {
      id: feedbackId,
      space: {
        createdById: userId,
        deletedAt: null,
      },
    },
    include: { space: true },
  });

  if (!feedback) {
    return { error: "Feedback not found or unauthorized" };
  }

  return { feedback };
}

export async function assertThankYouSpaceOwnership(
  userId: string,
  thankYouSpaceId: string
): Promise<{ thankYouSpace: ThankYouSpace & { space: Space } } | GuardError> {
  const thankYouSpace = await db.thankYouSpace.findFirst({
    where: {
      id: thankYouSpaceId,
      space: {
        createdById: userId,
        deletedAt: null,
      },
    },
    include: { space: true },
  });

  if (!thankYouSpace) {
    return { error: "Thank you page not found or unauthorized" };
  }

  return { thankYouSpace };
}

export async function assertPublishedSpace(
  spaceId: string
): Promise<{ space: Space } | GuardError> {
  const space = await db.space.findFirst({
    where: {
      id: spaceId,
      isPublished: true,
      deletedAt: null,
    },
  });

  if (!space) {
    return { error: "Space not found or not available" };
  }

  return { space };
}

export async function assertPublishedSpaceByName(
  spaceName: string
): Promise<{ space: Space } | GuardError> {
  const space = await db.space.findFirst({
    where: {
      name: spaceName,
      isPublished: true,
      deletedAt: null,
    },
  });

  if (!space) {
    return { error: "Space not found or not available" };
  }

  return { space };
}

export async function assertPublicFeedbackInSpace(
  spaceName: string,
  feedbackId: string
): Promise<
  | {
      feedback: TestimonialResponse & { space: { logo: string | null } };
    }
  | GuardError
> {
  const spaceCheck = await assertPublishedSpaceByName(spaceName);
  if ("error" in spaceCheck) {
    return spaceCheck;
  }

  const feedback = await db.feedback.findFirst({
    where: {
      id: feedbackId,
      spaceId: spaceCheck.space.id,
      addToWallOfLove: true,
      isArchived: false,
      isSpam: false,
    },
    include: {
      space: {
        select: {
          logo: true,
        },
      },
    },
  });

  if (!feedback) {
    return { error: "Feedback not found" };
  }

  return {
    feedback: {
      ...toPublicTestimonial(feedback),
      space: feedback.space,
    },
  };
}
