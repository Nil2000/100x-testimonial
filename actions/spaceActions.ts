"use server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { spaceSchema } from "@/schema/spaceSchema";
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
    spaceLogoUrl,
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
                title: question.question,
                order: index,
              };
            }),
          },
        },
        collectionType,
        collectStar: collectStarRating,
        logo: spaceLogoUrl || "",
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now()),
        createdBy: {
          connect: {
            id: session.user.id,
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
