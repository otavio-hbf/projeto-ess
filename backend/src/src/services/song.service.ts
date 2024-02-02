import SongRepository from "../repositories/song.repository";
import SongModel from "../models/song.model";
import { HttpNotFoundError } from "../utils/errors/http.error";
import SongEntity from "../entities/song.entity";

class SongServiceMessageCode {
  public static readonly song_not_found = "song_not_found";
}

class SongService {
  private songRepository: SongRepository;

  constructor(songRepository: SongRepository) {
    this.songRepository = songRepository;
  }

  public async getSongs(): Promise<SongModel[]> {
    const songsEntity = await this.songRepository.getSongs();

    const songsModel = songsEntity.map((song) => new SongModel(song));

    return songsModel;
  }

  public async getSong(id: string): Promise<SongModel> {
    const songEntity = await this.songRepository.getSong(id);

    if (!songEntity) {
      throw new HttpNotFoundError({
        msg: "Song not found",
        msgCode: SongServiceMessageCode.song_not_found,
      });
    }

    const songModel = new SongModel(songEntity);

    return songModel;
  }

  public async createSong(data: SongEntity): Promise<SongModel> {
    const songEntity = await this.songRepository.createSong(data);
    const songModel = new SongModel(songEntity);

    return songModel;
  }

  public async updateSong(id: string, data: SongEntity): Promise<SongModel> {
    const songEntity = await this.songRepository.updateSong(id, data);

    if (!songEntity) {
      throw new HttpNotFoundError({
        msg: "Song not found",
        msgCode: SongServiceMessageCode.song_not_found,
      });
    }

    const songModel = new SongModel(songEntity);

    return songModel;
  }

  public async deleteSong(id: string): Promise<void> {
    await this.songRepository.deleteSong(id);
  }
}

export default SongService;
