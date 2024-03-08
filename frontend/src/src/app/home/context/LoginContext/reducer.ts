import {
  LoginState,
  LoginStateAction,
  LoginStateActionType,
} from "./types";

/**
 * Reducer function for the PlaylistState context.
 * @param state - The current state of the PlaylistState context.
 * @param action - The action object that describes the state change.
 * @returns The new state after applying the action.
 */
const loginStateReducer = (
  state: LoginState,
  action: LoginStateAction,
): LoginState => {
  switch (action.type) {
    case LoginStateActionType.CHANGE_RS_GET_USERS:
      return {
        ...state,
        getUsersRequestStatus: action.payload,
      };
    case LoginStateActionType.CHANGE_RS_GET_USER:
      return {
        ...state,
        getUserRequestStatus: action.payload,
      };
    case LoginStateActionType.CHANGE_RS_CREATE_USER:
      return {
        ...state,
        createUserRequestStatus: action.payload,
      };
    case LoginStateActionType.CHANGE_RS_UPDATE_USER:
      return {
        ...state,
        updateUserRequestStatus: action.payload,
      };
    case LoginStateActionType.CHANGE_RS_DELETE_USER:
      return {
        ...state,
        deleteUserRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default loginStateReducer;
