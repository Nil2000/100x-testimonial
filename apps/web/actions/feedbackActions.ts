"use server";

import { db } from "@repo/db";
import { FeedbackType } from "@repo/db/enums";
import { sendMessageToQueue } from "@/lib/queue/sendMessage";
import feedbackSchema, { Feedback } from "@/schemas/feedbackSchema";
import videoFeedbackSchema, {
  VideoFeedback,
} from "@/schemas/videoFeedbackSchema";
import {
  assertFeedbackOwnership,
  assertPublicFeedbackInSpace,
  assertPublishedSpace,
  requireAuth,
} from "@/lib/authGuards";
import { toPublicTestimonial } from "@/lib/publicData";

export const submitTextFeedback = async (
  spaceId: string,
  values: Feedback,
  feedbackType: FeedbackType
) => {
  const validateFields = feedbackSchema.safeParse(values);

  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }

  const spaceCheck = await assertPublishedSpace(spaceId);
  if ("error" in spaceCheck) {
    return { error: spaceCheck.error };
  }

  const { space } = spaceCheck;

  try {
    const feedback = await db.feedback.create({
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

    if (space.isSentimentEnabled || space.isSpamEnabled) {
      const response = await sendMessageToQueue(
        JSON.stringify({
          id: feedback.id,
          answer: feedback.answer,
          name: feedback.name,
          email: feedback.email,
          spaceId: feedback.spaceId,
          isSentimentEnabled: space.isSentimentEnabled,
          isSpamEnabled: space.isSpamEnabled,
          isVideo: false,
        })
      );

      if (response.error) {
        return {
          error: response.error,
        };
      }
    } else {
      await db.feedback.update({
        where: { id: feedback.id },
        data: {
          sentimentStatus: "FAILED",
          spamStatus: "FAILED",
        },
      });
    }

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
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertFeedbackOwnership(
    authResult.userId,
    feedbackId
  );
  if ("error" in ownership) {
    return { error: ownership.error };
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
  values: VideoFeedback
) => {
  const validateFields = videoFeedbackSchema.safeParse(values);

  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }

  const spaceCheck = await assertPublishedSpace(spaceId);
  if ("error" in spaceCheck) {
    return { error: spaceCheck.error };
  }

  const { space } = spaceCheck;

  try {
    const feedback = await db.feedback.create({
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

    if (space.isSentimentEnabled || space.isSpamEnabled) {
      const response = await sendMessageToQueue(
        JSON.stringify({
          id: feedback.id,
          videoUrl: feedback.videoUrl,
          name: feedback.name,
          email: feedback.email,
          spaceId: feedback.spaceId,
          isSentimentEnabled: space.isSentimentEnabled,
          isSpamEnabled: space.isSpamEnabled,
          isVideo: true,
        })
      );

      if (response.error) {
        return {
          error: response.error,
        };
      }
    } else {
      await db.feedback.update({
        where: { id: feedback.id },
        data: {
          sentimentStatus: "FAILED",
          spamStatus: "FAILED",
        },
      });
    }

    return {
      message: "Feedback submitted",
    };
  } catch (error) {
    console.error("VIDEO_FEEDBACK_SUBMISSION_ERROR", error);
    return {
      error: "Failed to submit feedback",
    };
  }
};

export const deleteFeedback = async (feedbackId: string) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertFeedbackOwnership(
    authResult.userId,
    feedbackId
  );
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.feedback.delete({
      where: { id: feedbackId },
    });
    return {
      message: "Feedback deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_FEEDBACK_ERROR", error);
    return {
      error: "Failed to delete feedback",
    };
  }
};

export const getFeedbackByIdAndSpaceNameWithSpaceLogo = async (
  spaceName: string,
  feedbackId: string
) => {
  const result = await assertPublicFeedbackInSpace(spaceName, feedbackId);
  if ("error" in result) {
    return null;
  }

  return result.feedback;
};

export const getFeedbackById = async (feedbackId: string) => {
  try {
    const feedback = await db.feedback.findFirst({
      where: {
        id: feedbackId,
        addToWallOfLove: true,
        isArchived: false,
        isSpam: false,
        space: {
          isPublished: true,
          deletedAt: null,
        },
      },
    });

    if (!feedback) {
      return null;
    }

    return toPublicTestimonial(feedback);
  } catch (error) {
    console.error("GET_FEEDBACK_BY_ID_ERROR", error);
    return null;
  }
};

export const updateFeedbackStyleSettings = async (
  feedbackId: string,
  styleSettings: any
) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertFeedbackOwnership(
    authResult.userId,
    feedbackId
  );
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.feedback.update({
      where: {
        id: feedbackId,
      },
      data: {
        styleSettings,
      },
    });
    return {
      message: "Feedback style settings updated successfully",
    };
  } catch (error) {
    console.error("UPDATE_FEEDBACK_STYLE_SETTINGS_ERROR", error);
    return {
      error: "Failed to update feedback style settings",
    };
  }
};

export const archiveFeedback = async (feedbackId: string) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertFeedbackOwnership(
    authResult.userId,
    feedbackId
  );
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.feedback.update({
      where: { id: feedbackId },
      data: { isArchived: true, addToWallOfLove: false },
    });
    return {
      message: "Feedback archived successfully",
    };
  } catch (error) {
    console.error("ARCHIVE_FEEDBACK_ERROR", error);
    return {
      error: "Failed to archive feedback",
    };
  }
};

export const unarchiveFeedback = async (feedbackId: string) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertFeedbackOwnership(
    authResult.userId,
    feedbackId
  );
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.feedback.update({
      where: { id: feedbackId },
      data: { isArchived: false },
    });
    return {
      message: "Feedback unarchived successfully",
    };
  } catch (error) {
    console.error("UNARCHIVE_FEEDBACK_ERROR", error);
    return {
      error: "Failed to unarchive feedback",
    };
  }
};
