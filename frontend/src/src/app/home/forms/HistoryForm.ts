import * as z from "zod";

/**
 * Represents the schema for the TestForm.
 */
export const HistorySchema = z.object({
  user_id: z.string(),
  song_id: z.string(),
});

/**
 * Represents the type of the TestForm.
 */
export type HistorySchema = z.infer<typeof HistorySchema>;
