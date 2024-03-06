import SongModel from "./SongModel";

/**
 * Represents a history model.
 */
export default class HistoryModel {
  /**
   * The ID of the history.
   */
  id: string;

  /**
   * The ID of the user.
   */
  user_id: string;

  /**
   * The ID of the song.
   */
  song_id: string;

  /**
   * The song associated with the history.
   */
  song?: SongModel;

  /**
   * Creates an instance of HistoryModel.
   * @param {HistoryModel} data - The data to initialize the history model.
   */
  constructor(data: HistoryModel) {
    this.id = data.id;
    this.user_id = data.user_id;
    this.song_id = data.song_id;
    this.song = data.song;
  }
}
