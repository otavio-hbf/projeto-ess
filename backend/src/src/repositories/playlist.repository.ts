import PlaylistEntity from "../entities/playlist.entity";
import BaseRepository from "./base.repository";

class PlaylistRepository extends BaseRepository<PlaylistEntity> {
  constructor() {
    super("playlists");
  }

  public async getPlaylists(): Promise<PlaylistEntity[]> {
    return await this.findAll();
  }

  public async getPlaylist(id: string): Promise<PlaylistEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createPlaylist(data: PlaylistEntity): Promise<PlaylistEntity> {
    return await this.add(data);
  }

  public async updatePlaylist(
    id: string,
    data: PlaylistEntity
  ): Promise<PlaylistEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deletePlaylist(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }

  public async searchPlaylists(
    keyword: string,
    filter?: string
  ): Promise<PlaylistEntity[]> {
    return await this.findAll(
      (item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase()) && !item.private
    );
  }
}

export default PlaylistRepository;
