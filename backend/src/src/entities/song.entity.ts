import BaseEntity from "./base.entity";

export default class SongEntity extends BaseEntity {
  title: string;
  duration: number;
  artist: string;
  genre: string;
  currently_playing: boolean;

  constructor(data: SongEntity) {
    super(data.id || "");
    this.title = data.title;
    this.duration = data.duration;
    this.artist = data.artist;
    this.genre = data.genre;
  }
}
