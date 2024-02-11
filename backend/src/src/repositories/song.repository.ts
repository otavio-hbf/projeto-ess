import SongEntity from "../entities/song.entity";
import BaseRepository from "./base.repository";

class SongRepository extends BaseRepository<SongEntity> {
  constructor() {
    super("songs");
  }

  public async getSongs(): Promise<SongEntity[]> {
    return await this.findAll();
  }

  public async getSong(id: string): Promise<SongEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createSong(data: SongEntity): Promise<SongEntity> {
    return await this.add(data);
  }

  public async updateSong(
    id: string,
    data: SongEntity
  ): Promise<SongEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteSong(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
  // Implementing search function
  public async searchSongs(keyword: string): Promise<SongEntity[]> {
    return await this.findAll(
      (item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.artist.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  public async playPauseSong(id: string): Promise<SongEntity> {
    const song = await this.getSong(id);

    if (song) {
      song.currently_playing = !song.currently_playing;

      await this.updateSong(id, song);
      return song;
    } else {
      throw new Error("Song not found");
    }
  }
}

export default SongRepository;
