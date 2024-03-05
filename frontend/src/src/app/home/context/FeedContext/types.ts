import RequestStatus from "../../../../shared/types/request-status";
import MostPlayedModel from "../../models/MostPlayedModel";
import SongModel from "../../models/SongModel";
import StatisticsModel from "../../models/StatisticsModel";
import UserModel from "../../models/UserModel";

/**
 * Enum for the change types of FeedStateAction.
 */
export enum FeedStateActionType {
  CHANGE_RS_GET_SONGS = "CHANGE_GET_SONGS_REQUEST_STATUS",
}

/**
 * Represents the possible actions that can be dispatched to modify the home state.
 */
export type FeedStateAction = 
|   {
        type: FeedStateActionType.CHANGE_RS_GET_SONGS;
        payload: RequestStatus<SongModel[]>;
    };

/**
 * Represents the state of the home context.
 */
export interface FeedState {
  getSongsRequestStatus: RequestStatus<SongModel[]>;
}
