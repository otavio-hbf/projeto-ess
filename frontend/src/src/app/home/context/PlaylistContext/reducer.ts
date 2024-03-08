import {
  PlaylistState,
  PlaylistStateAction,
  PlaylistStateActionType,
} from "./types";

/**
 * Reducer function for the PlaylistState context.
 * @param state - The current state of the PlaylistState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const playlistStateReducer = (
  state: PlaylistState,
  action: PlaylistStateAction,
): PlaylistState => {
  switch (action.type) {
    case PlaylistStateActionType.CHANGE_RS_GET_PLAYLIST:
      return {
        ...state,
        getPlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_GET_USER_PLAYLISTS:
      return {
        ...state,
        getUserPlaylistsRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_CREATE_PLAYLIST:
      return {
        ...state,
        createPlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_UPDATE_PLAYLIST:
      return {
        ...state,
        updatePlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_DELETE_PLAYLIST:
      return {
        ...state,
        deletePlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_ADD_SONG_IN_PLAYLIST:
      return {
        ...state,
        addSongPlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_REMOVE_SONG_IN_PLAYLIST:
      return {
        ...state,
        removeSongPlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_FOLLOW_PLAYLIST:
      return {
        ...state,
        followPlaylistRequestStatus: action.payload,
      };
    case PlaylistStateActionType.CHANGE_RS_UNFOLLOW_PLAYLIST:
      return {
        ...state,
        unfollowPlaylistRequestStatus: action.payload,
      };
      

    default:
      return state;
  }
};

export default playlistStateReducer;
