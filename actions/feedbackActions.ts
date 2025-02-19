"use server";

import { auth } from "@/lib/auth";
import { db, FeedbackType } from "@/lib/db";
import feedbackSchema, { Feedback } from "@/schemas/feedbackSchema";

export const submitTextFeedback = async (
  spaceId: string,
  values: Feedback,
  feedbackType: FeedbackType
) => {
  const sesssion = await auth();

  if (!sesssion || !sesssion.user) {
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
