import RequestStatus from "../../../../shared/types/request-status";
import PlaylistModel from '../../models/PlaylistModel';

/**
 * Enum para os tipos de ações do PlaylistContext.
 */
export enum PlaylistStateActionType {
  CHANGE_RS_GET_USER_PLAYLISTS = 'CHANGE_GET_USER_PLAYLISTS_REQUEST_STATUS',
  CHANGE_RS_CREATE_PLAYLIST = 'CHANGE_CREATE_PLAYLIST_REQUEST_STATUS',
  CHANGE_RS_UPDATE_PLAYLIST = 'CHANGE_UPDATE_PLAYLIST_REQUEST_STATUS',
  CHANGE_RS_DELETE_PLAYLIST = 'CHANGE_DELETE_PLAYLIST_REQUEST_STATUS',
}

/**
 * Representa as possíveis ações que podem ser despachadas para modificar o estado do PlaylistContext.
 */
export type PlaylistStateAction =
  | {
    type: PlaylistStateActionType.CHANGE_RS_GET_USER_PLAYLISTS;
    payload: RequestStatus<PlaylistModel[]>;
  }
  | {
    type: PlaylistStateActionType.CHANGE_RS_CREATE_PLAYLIST;
    payload: RequestStatus<PlaylistModel>;
  }
  | {
    type: PlaylistStateActionType.CHANGE_RS_UPDATE_PLAYLIST;
    payload: RequestStatus<PlaylistModel>;
  }
  | {
    type: PlaylistStateActionType.CHANGE_RS_DELETE_PLAYLIST;
    payload: RequestStatus<any>;
  }

/**
 * Representa o estado do contexto de playlists.
 */
export interface PlaylistState {
  getUserPlaylistsRequestStatus: RequestStatus<PlaylistModel[]>;
  createPlaylistRequestStatus: RequestStatus<PlaylistModel>;
  updatePlaylistRequestStatus: RequestStatus<PlaylistModel>;
  deletePlaylistRequestStatus: RequestStatus<any>;
}
