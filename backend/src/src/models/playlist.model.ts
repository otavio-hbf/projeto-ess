import BaseModel from "./base.model";
import PlaylistEntity from "../entities/playlist.entity";

export default class PlaylistModel extends BaseModel {
  name: string;
  songs: string[]; // IDs das músicas na playlist
  createdBy: string; // ID do usuário que criou a playlist

  constructor(data: PlaylistModel) {
    super(data.id);
    this.name = data.name;
    this.songs = data.songs || [];
    this.createdBy = data.createdBy;
  }
}
