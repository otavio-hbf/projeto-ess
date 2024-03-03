import {
  HistoryState,
  HistoryStateAction,
  HistoryStateActionType,
} from "./types";

/**
 * Reducer function for the HomeState context.
 * @param state - The current state of the HomeState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const historyStateReducer = (
  state: HistoryState,
  action: HistoryStateAction,
): HistoryState => {
  switch (action.type) {
    case HistoryStateActionType.CHANGE_RS_CREATE_HISTORY:
      return {
        ...state,
        createHistoryRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_GET_HISTORY:
      return {
        ...state,
        getHistoryRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_GET_STATISTICS:
      return {
        ...state,
        getStatisticsRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_CLEAR_HISTORY:
      return {
        ...state,
        clearHistoryRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_DELETE_HISTORY:
      return {
        ...state,
        deleteHistoryRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_GET_MOST_PLAYED:
      return {
        ...state,
        getMostPlayedRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_TOGGLE_TRACKING:
      return {
        ...state,
        toggleTrackingRequestStatus: action.payload,
      };
    case HistoryStateActionType.CHANGE_RS_GET_USER:
      return {
        ...state,
        getUserRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default historyStateReducer;
