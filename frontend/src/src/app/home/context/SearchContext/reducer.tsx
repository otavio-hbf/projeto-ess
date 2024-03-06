import { SearchState, SearchStateAction, SearchStateActionType } from "./types";

/**
 * Reducer function for the HomeState context.
 * @param state - The current state of the HomeState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const searchStateReducer = (state: SearchState, action: SearchStateAction): SearchState => {
  switch (action.type) {
    case SearchStateActionType.CHANGE_RS_GET_SEARCH_SONGS:
      return {
        ...state,
        getSearchSongsRequestStatus: action.payload,
      };
    case SearchStateActionType.CHANGE_RS_GET_SEARCH_PLAYLISTS:
      return {
        ...state,
        getSearchPlaylistsRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default searchStateReducer;
