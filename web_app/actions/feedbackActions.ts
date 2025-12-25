"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { FeedbackType } from "@/generated/prisma/enums";
import { sendMessageToQueue } from "@/lib/queue/sendMessage";
import feedbackSchema, { Feedback } from "@/schemas/feedbackSchema";
import videoFeedbackSchema, {
  VideoFeedback,
} from "@/schemas/videoFeedbackSchema";

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

  const space = await db.space.findUnique({
    where: { id: spaceId },
  });

  if (!space) {
    return {
      error: "Space not found",
    };
  }

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
      // if either sentiment or spam is enabled
      const response = await sendMessageToQueue(
        JSON.stringify({
          id: feedback.id,
          answer: feedback.answer,
          name: feedback.name,
          email: feedback.email,
          spaceId: feedback.spaceId,
          isSentimentEnabled: space.isSentimentEnabled,
          isSpamEnabled: space.isSpamEnabled,
        }),
        "TEXT"
      );

      if (response.error) {
        return {
          error: response.error,
        };
      }
    } else {
      // if both sentiment and spam are disabled
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
  values: VideoFeedback
) => {
  const validateFields = videoFeedbackSchema.safeParse(values);

  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }

  const space = await db.space.findUnique({
    where: { id: spaceId },
  });

  if (!space) {
    return {
      error: "Space not found",
    };
  }

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
      // if either sentiment or spam is enabled
      const response = await sendMessageToQueue(
        JSON.stringify({
          id: feedback.id,
          videoUrl: feedback.videoUrl,
          name: feedback.name,
          email: feedback.email,
          spaceId: feedback.spaceId,
          isSentimentEnabled: space.isSentimentEnabled,
          isSpamEnabled: space.isSpamEnabled,
        }),
        "VIDEO"
      );

      if (response.error) {
        return {
          error: response.error,
        };
      }
    } else {
      // if both sentiment and spam are disabled
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
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
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
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const feedback = await db.feedback.findFirst({
      where: {
        id: feedbackId,
        space: {
          name: spaceName,
        },
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
      return null;
    }
    return feedback;
  } catch (error) {
    console.error("GET_FEEDBACK_BY_ID_AND_SPACENAME_ERROR", error);
    return {
      error: "Failed to fetch feedback",
    };
  }
};

export const getFeedbackById = async (feedbackId: string) => {
  try {
    const feedback = await db.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });
    return feedback;
  } catch (error) {
    console.error("GET_FEEDBACK_BY_ID_ERROR", error);
    return null;
  }
};

export const updateFeedbackStyleSettings = async (
  feedbackId: string,
  styleSettings: any
) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const feedback = await db.feedback.findUnique({
      where: {
        id: feedbackId,
      },
    });

    if (!feedback) {
      return {
        error: "Feedback not found",
      };
    }

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
