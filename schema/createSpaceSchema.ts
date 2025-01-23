import * as z from "zod";
const createSpaceSchema = z.object({
  spaceName: z.string().nonempty("Space name is required"),
  spaceLogo: z.string().nonempty("Space logo is required"),
  headerTitle: z.string().nonempty("Header title is required"),
  customMessage: z.string().nonempty("Custom message is required"),
  questionList: z.array(
    z.object({
      question: z.string().nonempty("Question is required"),
    })
  ),
  collectionType: z.enum(["Text only", "Video only", "Text and Video both"]),
  collectStarRating: z.boolean(),
  darkTheme: z.boolean().default(false),
});
