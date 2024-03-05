import { Dispatch } from "react";
import { PlaylistStateAction, PlaylistStateActionType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import PlaylistModel from "../../models/PlaylistModel";
import { PlaylistSchema } from "../../forms/PlaylistForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import { UserSchema } from "../../forms/UserSchema";
import UserModel from "../../models/UserModel";

export default class PlaylistService {
  private apiService: ApiService;
  private dispatch: Dispatch<PlaylistStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<PlaylistStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async getUserPlaylists(userId: string): Promise<void> {
    try {
      this.dispatch({
        type: PlaylistStateActionType.CHANGE_RS_GET_USER_PLAYLISTS,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(
        `/playlists/MyPlaylists/${userId}`,
      );

      result.handle({
        onSuccess: (response) => {
          const playlists = response.data.map(
            (playlist: any) => new PlaylistModel(playlist),
          );

          this.dispatch({
            type: PlaylistStateActionType.CHANGE_RS_GET_USER_PLAYLISTS,
            payload: RequestStatus.success(playlists),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: PlaylistStateActionType.CHANGE_RS_GET_USER_PLAYLISTS,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: PlaylistStateActionType.CHANGE_RS_GET_USER_PLAYLISTS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async createPlaylist(playlistSchema: PlaylistSchema): Promise<void> {
    try {
      this.dispatch({
        type: PlaylistStateActionType.CHANGE_RS_CREATE_PLAYLIST,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.post("/playlists", playlistSchema);

      result.handle({
        onSuccess: (response) => {
          this.dispatch({
            type: PlaylistStateActionType.CHANGE_RS_CREATE_PLAYLIST,
            payload: RequestStatus.success(response.data),
          });

          // refetch playlists
          this.getUserPlaylists(playlistSchema.createdBy);
        },
        onFailure: (error) => {
          this.dispatch({
            type: PlaylistStateActionType.CHANGE_RS_CREATE_PLAYLIST,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: PlaylistStateActionType.CHANGE_RS_CREATE_PLAYLIST,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async updatePlaylist(
    playlistId: string,
    playlistSchema: PlaylistSchema,
  ): Promise<void> {
    try {
      this.dispatch({
        type: PlaylistStateActionType.CHANGE_RS_UPDATE_PLAYLIST,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.update(
        `/playlists/${playlistId}`,
        playlistSchema,
      );

      result.handle({
        onSuccess: (response) => {
          this.dispatch({
            type: PlaylistStateActionType.CHANGE_RS_UPDATE_PLAYLIST,
            payload: RequestStatus.success(response.data),
          });

          // refetch playlists
          this.getUserPlaylists(playlistSchema.createdBy);
        },
        onFailure: (error) => {
          this.dispatch({
            type: PlaylistStateActionType.CHANGE_RS_UPDATE_PLAYLIST,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: PlaylistStateActionType.CHANGE_RS_UPDATE_PLAYLIST,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async deletePlaylist(playlistId: string, userId: string): Promise<void> {
    this.dispatch({
      type: PlaylistStateActionType.CHANGE_RS_DELETE_PLAYLIST,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.delete(
      `/playlists/${playlistId}`,
      userId,
    );

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: PlaylistStateActionType.CHANGE_RS_DELETE_PLAYLIST,
          payload: RequestStatus.success(response),
        });

        // refetch playlists
        this.getUserPlaylists(userId);
      },
      onFailure: (error) => {
        this.dispatch({
          type: PlaylistStateActionType.CHANGE_RS_DELETE_PLAYLIST,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}