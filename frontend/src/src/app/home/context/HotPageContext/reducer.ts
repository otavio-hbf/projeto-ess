import {
  HotPageState,
  HotPageStateAction,
  HotPageStateActionType,
} from "./types";

/**
 * Reducer function for the HomeState context.
 * @param state - The current state of the HomeState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const HotPageStateReducer = (
  state: HotPageState,
  action: HotPageStateAction,
): HotPageState => {
  switch (action.type) {
    case HotPageStateActionType.CHANGE_RS_GET_HOT_SONGS:
      return {
        ...state,
        getHotSongsRequestStatus: action.payload,
      };
    default:
      return state;
  }
};

export default HotPageStateReducer;
