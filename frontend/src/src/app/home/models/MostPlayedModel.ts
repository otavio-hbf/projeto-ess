import SongModel from "./SongModel";

export default class MostPlayedModel {
  song_id: string;
  song: SongModel;
  times_played: number;

  constructor(data: MostPlayedModel) {
    this.song_id = data.song_id;
    this.song = data.song;
    this.times_played = data.times_played;
  }
}
