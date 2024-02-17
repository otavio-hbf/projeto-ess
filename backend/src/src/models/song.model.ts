import BaseModel from "./base.model";

export default class SongModel extends BaseModel {
  title: string;
  duration: number;
  artist: string;
  genre: string;
  currently_playing: boolean;
  times_ever_played: number;

  constructor(data: SongModel) {
    super(data.id || "");
    this.title = data.title;
    this.duration = data.duration;
    this.artist = data.artist;
    this.genre = data.genre;
    this.currently_playing = data.currently_playing;
    this.times_ever_played = data.times_ever_played;
  }
}
