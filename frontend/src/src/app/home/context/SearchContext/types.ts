import RequestStatus from "../../../../shared/types/request-status";
import SongModel from "../../models/SongModel";
import PlaylistModel from "../../models/PlaylistModel";
/**
 * Represents the possible actions that can be dispatched to modify the home state.
 */
export enum SearchStateActionType {
  CHANGE_RS_GET_SEARCH_SONGS = "CHANGE_GET_SEARCH_SONGS_REQUEST_STATUS",
  CHANGE_RS_GET_SEARCH_PLAYLISTS = "CHANGE_GET_SEARCH_PLAYLISTS_REQUEST_STATUS",
}

/**
 * Represents the possible actions that can be dispatched to modify the home state.
 */
export type SearchStateAction =
  | {
      type: SearchStateActionType.CHANGE_RS_GET_SEARCH_SONGS;
      payload: RequestStatus<SongModel[]>;
    }
  | {
      type: SearchStateActionType.CHANGE_RS_GET_SEARCH_PLAYLISTS;
      payload: RequestStatus<PlaylistModel[]>;
    };

export interface SearchState {
  getSearchSongsRequestStatus: RequestStatus<SongModel[]>;
  getSearchPlaylistsRequestStatus: RequestStatus<PlaylistModel[]>;
}
