"use server";

import { auth } from "@/lib/auth";
import { db, FeedbackType } from "@/lib/db";
import feedbackSchema, { Feedback } from "@/schemas/feedbackSchema";
import videoFeedbackSchema, { VideoFeedback } from "@/schemas/videoFeedbackSchema";

export const submitTextFeedback = async (
  spaceId: string,
  values: Feedback,
  feedbackType: FeedbackType
) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }

  const validateFields = feedbackSchema.safeParse(values);

  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }

  try {
    await db.feedback.create({
      data: {
        ...values,
        feedbackType,
        space: {
          connect: {
            id: spaceId,
          },
        },
      },
    });
    return {
      message: "Feedback submitted",
    };
  } catch (error) {
    console.error("TEXT_FEEDBACK_SUBMISSION_ERROR", error);
    return {
      error: "Failed to submit feedback",
    };
  }
};

export const toggleWallOfLove = async (
  feedbackId: string,
  addToWallOfLove: boolean
) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    await db.feedback.update({
      where: { id: feedbackId },
      data: { addToWallOfLove },
    });
    return {
      message: "Feedback updated successfully",
    };
  } catch (error) {
    console.error("TOGGLE_WALL_OF_LOVE_ERROR", error);
    return {
      error: "Failed to update feedback",
    };
  }
};

export const submitVideoFeedback = async (
  spaceId: string,
  values: VideoFeedback) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }

  const validateFields = videoFeedbackSchema.safeParse(values);

  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }

  try {
    await db.feedback.create({
      data: {
        ...values,
        feedbackType: FeedbackType.VIDEO,
        space: {
          connect: {
            id: spaceId,
          },
        },
      },
    });
    return {
      message: "Feedback submitted",
    };
  } catch (error) {
    console.error("VIDEO_FEEDBACK_SUBMISSION_ERROR", error);
    return {
      error: "Failed to submit feedback",
    };
  }
}