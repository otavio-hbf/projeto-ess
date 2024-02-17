import PlaylistRepository from "../repositories/playlist.repository";
import PlaylistModel from "../models/playlist.model";
import SongRepository from "../repositories/song.repository";
import {
  HttpNotFoundError,
  HttpUnauthorizedError,
} from "../utils/errors/http.error";
import PlaylistEntity from "../entities/playlist.entity";
import { validate } from "class-validator";

class PlaylistServiceMessageCode {
  public static readonly playlist_not_found = "playlist_not_found";
  public static readonly song_not_found = "song_not_found";
}

class PlaylistService {
  private playlistRepository: PlaylistRepository;
  private songRepository: SongRepository;

  constructor(
    playlistRepository: PlaylistRepository,
    songRepository: SongRepository
  ) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
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

  public async deletePlaylist(id: string, userId: string): Promise<void> {
    const playlist = await this.playlistRepository.getPlaylist(id);

    if (!playlist) {
      // Trate o caso em que a playlist não existe
      throw new HttpNotFoundError({
        msg: "Playlist not found",
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    if (playlist.createdBy !== userId) {
      // O usuário autenticado não é o criador da playlist
      throw new HttpUnauthorizedError({
        msg: "Unauthorized: Only the owner can delete the playlist",
      });
    }

    // Lógica adicional, se necessário
    await this.playlistRepository.deletePlaylist(id);
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

  public async addSongToPlaylist(
    playlistId: string,
    songId: string,
    userId: string
  ): Promise<PlaylistModel> {
    const playlistEntity = await this.playlistRepository.getPlaylist(
      playlistId
    );
    const songEntity = await this.songRepository.getSong(songId);

    if (!playlistEntity) {
      throw new HttpNotFoundError({
        msg: "Playlist not found",
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    if (!songEntity) {
      throw new HttpNotFoundError({
        msg: "Song not found",
        msgCode: PlaylistServiceMessageCode.song_not_found,
      });
    }

    if (playlistEntity.createdBy !== userId) {
      // O usuário autenticado não é o criador da playlist
      throw new HttpUnauthorizedError({
        msg: "Unauthorized: Only the owner can update the playlist",
      });
    }

    // Verifique se a música já está na playlist
    if (playlistEntity.songs.includes(songId)) {
      throw new Error("Song is already in the playlist");
    } else {
      // Adiciona a música à playlist
      playlistEntity.songs.push(songId);
      await this.playlistRepository.updatePlaylist(playlistId, playlistEntity);
    }

    // Atualiza a playlist no repositório
    const updatedPlaylistEntity = await this.playlistRepository.updatePlaylist(
      playlistId,
      playlistEntity
    );

    if (!updatedPlaylistEntity) {
      throw new HttpNotFoundError({
        msg: "Playlist fail to add song",
        msgCode: PlaylistServiceMessageCode.playlist_not_found,
      });
    }

    const playlistModel = new PlaylistModel(updatedPlaylistEntity);

    return playlistModel;
  }
}

export default PlaylistService;
