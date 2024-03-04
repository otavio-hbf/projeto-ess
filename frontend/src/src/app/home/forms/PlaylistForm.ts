import * as z from 'zod';

/**
 * Representa o esquema para o PlaylistForm.
 */
export const PlaylistSchema = z.object({
    playlist_id: z.string(),
    name: z.string(),
    songs: z.string(),
    createdBy: z.string(),
    private: z.string(),
    followers: z.string(),
    contributors: z.string(),
});

/**
 * Representa o tipo do PlaylistForm.
 */
export type PlaylistSchema = z.infer<typeof PlaylistSchema>;
