import { CollectionType } from "@/lib/db";
import * as z from "zod";
export const createSpaceSchema = z.object({
  spaceName: z.string().nonempty("Space name is required"),
  spaceLogoUrl: z.string().nonempty("Space logo is required").optional(),
  headerTitle: z.string().nonempty("Header title is required"),
  customMessage: z.string().nonempty("Custom message is required"),
  questionList: z.array(
    z.object({
      id: z.string(),
      question: z.string().nonempty("Question is required"),
      maxLength: z.number().int(),
    })
  ),
  collectionType: z.enum([
    CollectionType.TEXT,
    CollectionType.VIDEO,
    CollectionType.TEXT_AND_VIDEO,
  ]),
  collectStarRating: z.boolean(),
  // darkTheme: z.boolean().default(false),
});
