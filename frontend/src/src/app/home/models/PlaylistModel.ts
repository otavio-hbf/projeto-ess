export default class PlaylistModel{
  playlist_id: string;
  name: string;
  songs: string[]; // IDs das músicas na playlist
  createdBy: string; // ID do usuário que criou a playlist
  private: boolean;
  followers: string[]; // IDs dos usuários que seguem a playlist
  contributors: string[]; // IDs dos usuários que são contribuidores da playlist

  constructor(data: PlaylistModel) {
    this.playlist_id = data.playlist_id;
    this.name = data.name;
    this.songs = data.songs || [];
    this.createdBy = data.createdBy;
    this.private = data.private;
    this.followers = data.followers || [];
    this.contributors = data.contributors || [];
  }
}
