import { FeedState, FeedStateAction, FeedStateActionType } from "./types";

/**
 * Reducer function for the HomeState context.
 * @param state - The current state of the HomeState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const feedStateReducer = (
  state: FeedState,
  action: FeedStateAction,
): FeedState => {
  switch (action.type) {
    case FeedStateActionType.CHANGE_RS_GET_SONGS:
      return {
        ...state,
        getSongsRequestStatus: action.payload,
      };
    case FeedStateActionType.CHANGE_RS_GET_RECOMMENDATIONS:
        return {
          ...state,
          getRecommendationsRequestStatus: action.payload,
    };

    default:
      return state;
  }
};

export default feedStateReducer;
