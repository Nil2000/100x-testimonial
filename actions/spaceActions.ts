"use server";
import { db } from "@/lib/db";
import { createSpaceSchema } from "@/schema/createSpaceSchema";
import * as z from "zod";

export const createSpace = async (
  values: z.infer<typeof createSpaceSchema>
) => {
  const validateFields = createSpaceSchema.safeParse(values);

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
                maxLength: question.maxLength,
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
      },
    });
    return {
      success: "Space created successfully",
    };
  } catch (error) {
    return {
      error: "Failed to create space",
    };
  }
};
