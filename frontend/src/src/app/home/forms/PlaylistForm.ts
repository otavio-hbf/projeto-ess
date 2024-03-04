import * as z from "zod";

/**
 * Representa o esquema para o PlaylistForm.
 */
export const PlaylistSchema = z.object({
  name: z.string(),
  createdBy: z.string(),
  private: z.boolean(),
});

/**
 * Representa o tipo do PlaylistForm.
 */
export type PlaylistSchema = z.infer<typeof PlaylistSchema>;
