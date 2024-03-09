import RequestStatus from "../../../../shared/types/request-status";
import SongModel from "../../models/SongModel";
/**
 * Enum for the change types of FeedStateAction.
 */
export enum HotPageStateActionType {
  CHANGE_RS_GET_HOT_SONGS = "CHANGE_GET_HOT_SONGS_REQUEST_STATUS",
}

/**
 * Represents the possible actions that can be dispatched to modify the home state.
 */
export type HotPageStateAction = {
  type: HotPageStateActionType.CHANGE_RS_GET_HOT_SONGS;
  payload: RequestStatus<SongModel[]>;
};

/**
 * Represents the state of the home context.
 */
export interface HotPageState {
  getHotSongsRequestStatus: RequestStatus<SongModel[]>;
}
