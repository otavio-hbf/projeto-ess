import RequestStatus from "../../../../shared/types/request-status";
import HistoryModel from "../../models/HistoryModel";
import StatisticsModel from "../../models/StatisticsModel";

/**
 * Enum for the change types of HistoryStateAction.
 */
export enum HistoryStateActionType {
  CHANGE_RS_CREATE_HISTORY = "CHANGE_CREATE_HISTORY_REQUEST_STATUS",
  CHANGE_RS_GET_HISTORY = "CHANGE_GET_HISTORY_REQUEST_STATUS",
  CHANGE_RS_GET_STATISTICS = "CHANGE_GET_STATISTICS_REQUEST_STATUS",
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
    };

/**
 * Represents the state of the home context.
 */
export interface HistoryState {
  createHistoryRequestStatus: RequestStatus<any>;
  getHistoryRequestStatus: RequestStatus<HistoryModel[]>;
  getStatisticsRequestStatus: RequestStatus<StatisticsModel>;
}
