import { z } from "zod";

const feedbackSchema = z.object({
  answer: z.string().nonempty("Answer is required"),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  permission: z
    .boolean()
    .refine((val) => val === true, "Permission is required"),
});

export default feedbackSchema;
