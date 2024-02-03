import BaseModel from "./base.model";
import SongModel from "./song.model";
import UserModel from "./user.model";

export default class StatisticsModel {
  most_played_song_name?: string;
  most_played_genre_name?: string;
  play_duration?: number;

  constructor(data: StatisticsModel) {
    this.most_played_song_name = data.most_played_song_name;
    this.most_played_genre_name = data.most_played_genre_name;
    this.play_duration = data.play_duration;
  }
}
