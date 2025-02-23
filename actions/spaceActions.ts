"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { spaceSchema, thankyouSchema } from "@/schemas/spaceSchema";
import * as z from "zod";

export const createSpace = async (values: z.infer<typeof spaceSchema>) => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Unauthorized",
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
    spaceLogoKey,
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
        logoObjectKey: spaceLogoKey || "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
        thankyouSpace: {
          create: {
            title: "Thank you",
            message: "Thank you for your feedback",
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
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: "Unauthorized",
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
    spaceLogoKey,
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
        logoObjectKey: spaceLogoKey || "",
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
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }
  const validateFields = thankyouSchema.safeParse(values);
  if (validateFields.error) {
    return {
      error: "Invalid fields",
    };
  }
  const { id, title, message } = validateFields.data;
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
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
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
  const existingSpace = await db.space.findFirst({
    where: {
      name: spaceName,
    },
  });

  if (!existingSpace) {
    return false;
  }

  if (!existingSpace.isPublished) {
    return false;
  }

  return true;
};

export const getTestimonialsForWallOfLove = async (spaceName: string) => {
  const space = await db.space.findFirst({
    where: {
      name: spaceName,
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
    },
  });
  return {
    error: null,
    data: feedbacks,
  };
};
