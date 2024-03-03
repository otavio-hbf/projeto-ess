import RequestStatus from "../../../../shared/types/request-status";
import HistoryModel from "../../models/HistoryModel";
import MostPlayedModel from "../../models/MostPlayedModel";
import StatisticsModel from "../../models/StatisticsModel";

/**
 * Enum for the change types of HistoryStateAction.
 */
export enum HistoryStateActionType {
  CHANGE_RS_CREATE_HISTORY = "CHANGE_CREATE_HISTORY_REQUEST_STATUS",
  CHANGE_RS_GET_HISTORY = "CHANGE_GET_HISTORY_REQUEST_STATUS",
  CHANGE_RS_GET_STATISTICS = "CHANGE_GET_STATISTICS_REQUEST_STATUS",
  CHANGE_RS_CLEAR_HISTORY = "CHANGE_CLEAR_HISTORY_REQUEST_STATUS",
  CHANGE_RS_DELETE_HISTORY = "CHANGE_DELETE_HISTORY_REQUEST_STATUS",
  CHANGE_RS_GET_MOST_PLAYED = "CHANGE_GET_MOST_PLAYED_REQUEST_STATUS",
}

/**
 * Represents the possible actions that can be dispatched to modify the home state.
 */
export type HistoryStateAction =
  | {
      type: HistoryStateActionType.CHANGE_RS_CREATE_HISTORY;
      payload: RequestStatus<any>;
    }
  | {
      type: HistoryStateActionType.CHANGE_RS_GET_HISTORY;
      payload: RequestStatus<HistoryModel[]>;
    }
  | {
      type: HistoryStateActionType.CHANGE_RS_GET_STATISTICS;
      payload: RequestStatus<StatisticsModel>;
    }
  | {
      type: HistoryStateActionType.CHANGE_RS_CLEAR_HISTORY;
      payload: RequestStatus<any>;
    }
  | {
      type: HistoryStateActionType.CHANGE_RS_DELETE_HISTORY;
      payload: RequestStatus<any>;
    }
  | {
      type: HistoryStateActionType.CHANGE_RS_GET_MOST_PLAYED;
      payload: RequestStatus<MostPlayedModel[]>;
    };

/**
 * Represents the state of the home context.
 */
export interface HistoryState {
  createHistoryRequestStatus: RequestStatus<any>;
  getHistoryRequestStatus: RequestStatus<HistoryModel[]>;
  getStatisticsRequestStatus: RequestStatus<StatisticsModel>;
  clearHistoryRequestStatus: RequestStatus<any>;
  deleteHistoryRequestStatus: RequestStatus<any>;
  getMostPlayedRequestStatus: RequestStatus<MostPlayedModel[]>;
}
