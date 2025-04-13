import { CollectionType } from "@/lib/db";
import * as z from "zod";
export const spaceSchema = z.object({
  spaceName: z.string().nonempty("Space name is required"),
  spaceLogoKey: z.string().nonempty("Space logo is required").optional(),
  headerTitle: z.string().nonempty("Header title is required"),
  customMessage: z.string().nonempty("Custom message is required"),
  questionList: z.array(
    z.object({
      id: z.string(),
      title: z.string().nonempty("Question is required"),
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
export const thankyouSchema = z.object({
  id: z.string().nonempty("ID is required"),
  title: z.string().nonempty("Title is required"),
  message: z.string().nonempty("Message is required"),
});
