import { z } from "zod";

const feedbackSchema = z.object({
  answer: z.string().min(30, "Answer should be at least 30 characters"),
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  permission: z
    .boolean()
    .refine((val) => val === true, "Permission is required to proceed"),
  imageUrl: z.string().optional(),
  profileImageUrl: z.string().optional(),
});

export type Feedback = z.infer<typeof feedbackSchema>;

export default feedbackSchema;
