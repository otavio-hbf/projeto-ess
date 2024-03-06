import SongModel from "./SongModel";

export default class PlaylistModel {
  id: string;
  name: string;
  songs: string[];
  songsContent?: SongModel[];
  createdBy: string;
  private: boolean;
  followers: string[];
  contributors: string[];

  constructor(data: PlaylistModel) {
    this.id = data.id;
    this.name = data.name;
    this.songs = data.songs || [];
    this.songsContent || [];
    this.createdBy = data.createdBy;
    this.private = data.private;
    this.followers = data.followers || [];
    this.contributors = data.contributors || [];
  }
}
