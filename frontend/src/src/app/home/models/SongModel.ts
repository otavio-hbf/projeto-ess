/**
 * Represents a song model.
 */
export default class SongModel {
  /**
   * The unique identifier of the song.
   */
  id: string;

  /**
   * The title of the song.
   */
  title: string;

  /**
   * The duration of the song in seconds.
   */
  duration: number;

  /**
   * The artist of the song.
   */
  artist: string;

  /**
   * The genre of the song.
   */
  genre: string;

  /**
   * The number of times the song has been played.
   */
  times_ever_played: number;

  /**
   * Creates a new instance of the SongModel class.
   * @param data - The data to initialize the song model.
   */
  constructor(data: SongModel) {
    this.id = data.id;
    this.title = data.title;
    this.duration = data.duration;
    this.artist = data.artist;
    this.genre = data.genre;
    this.times_ever_played = data.times_ever_played;
  }
}
