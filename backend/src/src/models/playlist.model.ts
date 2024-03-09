import BaseModel from "./base.model";
import SongModel from "./song.model";
import PlaylistEntity from "../entities/playlist.entity";

export default class PlaylistModel extends BaseModel {
  name: string;
  songs: string[];
  songsContent?: SongModel[];
  createdBy: string;
  private: boolean;
  followers: string[];
  contributors: string[];

  constructor(data: PlaylistModel) {
    super(data.id);
    this.name = data.name;
    this.songs = data.songs || [];
    this.songsContent || [];
    this.createdBy = data.createdBy;
    this.private = data.private;
    this.followers = data.followers || [];
    this.contributors = data.contributors || [];
  }
}
