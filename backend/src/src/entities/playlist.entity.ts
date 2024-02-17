import BaseEntity from "./base.entity";

export default class PlaylistEntity extends BaseEntity {
  name: string;
  songs: string[]; // IDs das músicas na playlist
  createdBy: string; // ID do usuário que criou a playlist
  private: boolean;
  followers: string[]; // IDs dos usuários que seguem a playlist

  constructor(data: PlaylistEntity) {
    super(data.id || "");
    this.name = data.name;
    this.songs = data.songs || [];
    this.createdBy = data.createdBy;
    this.private = data.private || false;
    this.followers = data.followers || [];
  }
}
