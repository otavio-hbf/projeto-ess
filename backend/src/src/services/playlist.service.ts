import PlaylistRepository from "../repositories/playlist.repository";
import PlaylistModel from "../models/playlist.model";
import { HttpNotFoundError } from "../utils/errors/http.error";
import PlaylistEntity from "../entities/playlist.entity";
import { validate } from "class-validator";

class PlaylistServiceMessageCode {
  public static readonly playlist_not_found = "playlist_not_found";
}

class PlaylistService {
  private playlistRepository: PlaylistRepository;

  constructor(playlistRepository: PlaylistRepository) {
    this.playlistRepository = playlistRepository;
  }

  public async getPlaylists(): Promise<PlaylistModel[]> {
    const playlistsEntity = await this.playlistRepository.getPlaylists();

    const playlistsModel = playlistsEntity.map(
      (playlist) => new PlaylistModel(playlist)
    );

    return playlistsModel;
  }

  public async getPlaylist(id: string): Promise<PlaylistModel> {
    const playlistEntity = await this.playlistRepository.getPlaylist(id);

    if (!playlistEntity) {
      throw new HttpNotFoundError({
        msg: "Playlist not found",
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async createPlaylist(data: PlaylistEntity): Promise<PlaylistModel> {
    // Validate the playlist data using class-validator
    const errors = await validate(data);

    if (errors.length > 0) {
      // Handle validation errors
      throw new TypeError(
        "Playlist data is incomplete or not of the correct type"
      );
    }

    const playlistEntity = await this.playlistRepository.createPlaylist(data);
    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async updatePlaylist(
    id: string,
    data: PlaylistEntity
  ): Promise<PlaylistModel> {
    const playlistEntity = await this.playlistRepository.updatePlaylist(
      id,
      data
    );

    if (!playlistEntity) {
      throw new HttpNotFoundError({
        msg: "Playlist not found",
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    const playlistModel = new PlaylistModel(playlistEntity);

    return playlistModel;
  }

  public async deletePlaylist(id: string): Promise<void> {
    await this.playlistRepository.deletePlaylist(id);
  }

  async followPlaylist(playlistId: string, userId: string): Promise<void> {
    const playlistEntity: PlaylistEntity = await this.getPlaylist(playlistId);
    const playlistRepository: PlaylistRepository = new PlaylistRepository();

    if (!(playlistEntity.followers.indexOf(userId) > -1)) {
      playlistEntity.followers.push(userId);
      await playlistRepository.updatePlaylist(playlistId, playlistEntity);
    }
  }

  async unfollowPlaylist(playlistId: string, userId: string): Promise<void> {
    const playlistEntity: PlaylistEntity = await this.getPlaylist(playlistId);
    const playlistRepository: PlaylistRepository = new PlaylistRepository();

    const index: number = playlistEntity.followers.indexOf(userId);
    if (index !== -1) {
      playlistEntity.followers.splice(index, 1);
      await playlistRepository.updatePlaylist(playlistId, playlistEntity);
    }
  }

  public async searchPlaylists(
    keyword: string,
    filter?: string
  ): Promise<PlaylistModel[]> {
    let playlistsEntity;
    if (filter) {
      playlistsEntity = await this.playlistRepository.searchPlaylists(
        keyword,
        filter
      );
    } else {
      playlistsEntity = await this.playlistRepository.searchPlaylists(keyword);
    }

    const playlistsModel = playlistsEntity.map(
      (playlist) => new PlaylistModel(playlist)
    );
    return playlistsModel;
  }
}

export default PlaylistService;
