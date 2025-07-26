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
            id: session.user.id,
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
  try {
    const existingSpace = await db.space.findFirst({
      where: {
        name: spaceName,
      },
      include: {
        questions: {
          select: {
            id: true,
            title: true,
          },
          orderBy: {
            order: "asc",
          },
        },
        thankyouSpace: {
          select: {
            title: true,
            message: true,
          },
        },
      },
    });

    if (!existingSpace) {
      return null;
    }

    if (!existingSpace.isPublished) {
      return null;
    }

    return existingSpace;
  } catch (error) {
    console.error(error);
    return null;
  }
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
  
  // Extract wall of love settings from theme
  const theme = space.theme as any;
  const wallOfLoveSettings = theme?.wallOfLove || {
    style: "list",
    styleOptions: { columns: "3" }
  };
  
  return {
    error: null,
    data: feedbacks,
    spaceId: space.id,
    wallOfLoveSettings,
  };
};

export const saveWallOfLoveSettings = async (
  spaceId: string,
  wallOfLoveSettings: {
    style: string;
    styleOptions: {
      columns?: string;
      rows?: string;
    };
  }
) => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  try {
    const space = await db.space.findFirst({
      where: {
        id: spaceId,
        createdById: session.user.id,
      },
    });

    if (!space) {
      return {
        error: "Space not found or unauthorized",
      };
    }

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

export const toggleAnalysis = async (id: string, status: boolean) => {
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
        isAnalysisEnabled: status,
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
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: "Unauthorized",
    };
  }
  try {
    const isSpaceOwner = await db.space.findFirst({
      where: {
        id,
        createdById: session.user.id,
      },
    });

    if (!isSpaceOwner) {
      return {
        error: "You are not the owner of this space",
      };
    }

    await db.space.delete({
      where: {
        id,
        createdById: session.user.id,
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
