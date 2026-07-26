"use server";
import { db } from "@repo/db";
import { spaceSchema, thankyouSchema } from "@/schemas/spaceSchema";
import { checkUserAccess } from "@/lib/accessControl";
import {
  assertSpaceOwnership,
  assertThankYouSpaceOwnership,
  requireAuth,
} from "@/lib/authGuards";
import {
  getPublicSpaceSelect,
  getWallOfLoveSettings,
  publishedSpaceByNameWhere,
  toPublicSpace,
  toPublicTestimonial,
} from "@/lib/publicData";
import { isReservedSpaceSegment } from "@/lib/routes";
import * as z from "zod";

export const createSpace = async (values: z.infer<typeof spaceSchema>) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const { userId } = authResult;
  const accessCheck = await checkUserAccess(userId, "space");

  if (!accessCheck.hasAccess) {
    return {
      error: accessCheck.reason,
      limitReached: true,
      currentUsage: accessCheck.currentUsage,
      limit: accessCheck.limit,
    };
  }

  const validateFields = spaceSchema.safeParse(values);

  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }

  const {
    spaceName,
    headerTitle,
    customMessage,
    questionList,
    collectionType,
    collectStarRating,
    logo,
  } = validateFields.data;

  // await db.question.createMany({
  //   data:questionList.map((question,index)=>{
  //     return {
  //       question:question.question,
  //       maxLength:question.maxLength,
  //       order:index,
  //     }
  //   })
  // })
  try {
    await db.space.create({
      data: {
        name: spaceName,
        headerTitle,
        headerSubtitle: customMessage,
        questions: {
          createMany: {
            data: questionList.map((question, index) => {
              return {
                title: question.title,
                order: index,
              };
            }),
          },
        },
        collectionType,
        collectStar: collectStarRating,
        logo: logo,
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        createdBy: {
          connect: {
            id: userId,
          },
        },
        thankyouSpace: {
          create: {
            title: "Thank you",
            message: "Thank you for your feedback",
          },
        },
        theme: {
          theme: null,
          themeOptions: {
            showBrandLogo: true,
            font: "Roboto",
          },
        },
      },
    });
    return {
      message: "Space created successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const updateSpace = async (
  id: string,
  values: z.infer<typeof spaceSchema>
) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  const validateFields = spaceSchema.safeParse(values);
  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }
  const {
    spaceName,
    headerTitle,
    customMessage,
    questionList,
    collectionType,
    collectStarRating,
    logo,
  } = validateFields.data;
  try {
    await db.space.update({
      where: {
        id,
      },
      data: {
        name: spaceName,
        headerTitle,
        headerSubtitle: customMessage,
        questions: {
          deleteMany: {},
          createMany: {
            data: questionList.map((question, index) => {
              return {
                title: question.title,
                order: index,
              };
            }),
          },
        },
        collectionType,
        collectStar: collectStarRating,
        logo: logo,
        updatedAt: new Date(Date.now()),
      },
    });
    return {
      message: "Space updated successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const updateThanksSpace = async (
  values: z.infer<typeof thankyouSchema>
) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const validateFields = thankyouSchema.safeParse(values);
  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }
  const { id, title, message } = validateFields.data;

  const ownership = await assertThankYouSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }
  try {
    await db.thankYouSpace.update({
      where: {
        id,
      },
      data: {
        title,
        message,
      },
    });
    return {
      message: "Thank you space updated successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const changeSpaceStatus = async (id: string, status: boolean) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.space.update({
      where: {
        id,
      },
      data: {
        isPublished: status,
      },
    });
    return {
      message: "Space status updated successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const spaceExists = async (spaceName: string) => {
  if (isReservedSpaceSegment(spaceName)) {
    return null;
  }

  try {
    const existingSpace = await db.space.findFirst({
      where: {
        name: spaceName,
        ...publishedSpaceByNameWhere,
      },
      select: getPublicSpaceSelect(),
    });

    if (!existingSpace) {
      return null;
    }

    return toPublicSpace(existingSpace);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getTestimonialsForWallOfLove = async (spaceName: string) => {
  if (isReservedSpaceSegment(spaceName)) {
    return { error: "Space not found" };
  }

  try {
    const space = await db.space.findFirst({
      where: {
        name: spaceName,
        ...publishedSpaceByNameWhere,
      },
      select: {
        id: true,
        theme: true,
      },
    });
    if (!space) {
      return {
        error: "Space not found",
      };
    }
    const feedbacks = await db.feedback.findMany({
      where: {
        spaceId: space.id,
        addToWallOfLove: true,
        isArchived: false,
        isSpam: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      data: feedbacks.map(toPublicTestimonial),
      wallOfLoveSettings: getWallOfLoveSettings(space.theme),
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const saveWallOfLoveSettings = async (
  spaceId: string,
  wallOfLoveSettings: {
    style: string;
    styleOptions: {
      columns?: string;
      rows?: string;
      cardVariant?: string;
      showRating?: string;
      showDate?: string;
      gap?: string;
    };
  }
) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, spaceId);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    const { space } = ownership;
    const currentTheme = (space.theme as any) || {};
    const updatedTheme = {
      ...currentTheme,
      wallOfLove: wallOfLoveSettings,
    };

    await db.space.update({
      where: { id: spaceId },
      data: { theme: updatedTheme },
    });

    return {
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      error: "Failed to save wall of love settings",
    };
  }
};

export const toggleSentimentAnalysis = async (id: string, status: boolean) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  const user = await db.user.findUnique({
    where: { id: authResult.userId },
    select: { plan: true },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  if (user.plan === "FREE") {
    return {
      error:
        "Sentiment analysis is not available on the Free plan. Please upgrade to continue.",
    };
  }

  try {
    await db.space.update({
      where: {
        id,
      },
      data: {
        isSentimentEnabled: status,
      },
    });
    return {
      message: "Sentiment analysis status updated successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const toggleSpamDetection = async (id: string, status: boolean) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  const user = await db.user.findUnique({
    where: { id: authResult.userId },
    select: { plan: true },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  if (user.plan === "FREE") {
    return {
      error:
        "Spam detection is not available on the Free plan. Please upgrade to continue.",
    };
  }

  try {
    await db.space.update({
      where: {
        id,
      },
      data: {
        isSpamEnabled: status,
      },
    });
    return {
      message: "Spam detection status updated successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const toggleAnalysis = async (id: string, status: boolean) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.space.update({
      where: {
        id,
      },
      data: {
        isSentimentEnabled: status,
      },
    });
    return {
      message: "Space analysis status updated successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const deleteSpace = async (id: string) => {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    return { error: authResult.error };
  }

  const ownership = await assertSpaceOwnership(authResult.userId, id);
  if ("error" in ownership) {
    return { error: ownership.error };
  }

  try {
    await db.space.update({
      where: {
        id,
        createdById: authResult.userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: "Space deleted successfully",
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};
