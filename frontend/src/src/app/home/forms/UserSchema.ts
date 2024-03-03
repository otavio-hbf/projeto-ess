import * as z from "zod";

/**
 * Represents the schema for the TestForm.
 */
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
  history_tracking: z.boolean(),
});

/**
 * Represents the type of the TestForm.
 */
export type UserSchema = z.infer<typeof UserSchema>;
