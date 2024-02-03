import BaseModel from "./base.model";
import SongModel from "./song.model";
import UserModel from "./user.model";

export default class MostPlayedModel {
  song_id: string;
  song_name: string;
  song_genre: string;
  song_duration: number;
  times_played: number;

  constructor(data: MostPlayedModel) {
    this.song_id = data.song_id;
    this.song_name = data.song_name;
    this.song_genre = data.song_genre;
    this.song_duration = data.song_duration;
    this.times_played = data.times_played;
  }
}
