import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long").max(255),
  description: z
    .string()
    .min(1, "Description must be at least 1 character long")
    .max(255),
});
