import RequestStatus from "../../../../shared/types/request-status";
import UserModel from "../../models/UserModel";

/**
 * Enum para os tipos de ações do PlaylistContext.
 */
export enum LoginStateActionType {
  CHANGE_RS_GET_USERS = "CHANGE_GET_USERS_REQUEST_STATUS",
  CHANGE_RS_GET_USER = "CHANGE_GET_USER_REQUEST_STATUS",
  CHANGE_RS_CREATE_USER = "CHANGE_CREATE_USER_REQUEST_STATUS",
  CHANGE_RS_UPDATE_USER = "CHANGE_UPDATE_PLAYLIST_REQUEST_STATUS",
  CHANGE_RS_DELETE_USER = "CHANGE_DELETE_PLAYLIST_REQUEST_STATUS",
}

/**
 * Representa as possíveis ações que podem ser despachadas para modificar o estado do PlaylistContext.
 */
export type LoginStateAction =
  | {
      type: LoginStateActionType.CHANGE_RS_GET_USERS;
      payload: RequestStatus<UserModel>;
    }
  | {
      type: LoginStateActionType.CHANGE_RS_GET_USER;
      payload: RequestStatus<UserModel[]>;
    }
  | {
      type: LoginStateActionType.CHANGE_RS_CREATE_USER;
      payload: RequestStatus<UserModel>;
    }
  | {
      type: LoginStateActionType.CHANGE_RS_UPDATE_USER;
      payload: RequestStatus<UserModel>;
    }
  | {
      type: LoginStateActionType.CHANGE_RS_DELETE_USER;
      payload: RequestStatus<any>;
    };
/**
 * Representa o estado do contexto de playlists.
 */
export interface LoginState {
  getUsersRequestStatus: RequestStatus<UserModel>;
  getUserRequestStatus: RequestStatus<UserModel[]>;
  createUserRequestStatus: RequestStatus<UserModel>;
  updateUserRequestStatus: RequestStatus<UserModel>;
  deleteUserRequestStatus: RequestStatus<any>;
}
