import * as z from "zod";

export const SongSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.number(),
  artist: z.string(),
  genre: z.string(),
  times_ever_played: z.number(),
});

export type SongSchema = z.infer<typeof SongSchema>;
