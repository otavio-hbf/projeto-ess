/**
 * Service class for handling API requests related to the HistoryContext in the application.
 */
import { Dispatch } from "react";
import { HistoryStateAction, HistoryStateActionType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { TestFormType } from "../../forms/TestForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import HistoryModel from "../../models/HistoryModel";
import StatisticsModel from "../../models/StatisticsModel";

export default class HistoryService {
  private apiService: ApiService;
  private dispatch: Dispatch<HistoryStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<HistoryStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createHistory(testForm: TestFormType): Promise<void> {
    this.dispatch({
      type: HistoryStateActionType.CHANGE_RS_CREATE_HISTORY,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post("/history", testForm);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: HistoryStateActionType.CHANGE_RS_CREATE_HISTORY,
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: HistoryStateActionType.CHANGE_RS_CREATE_HISTORY,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getHistory(uid: string): Promise<void> {
    try {
      this.dispatch({
        type: HistoryStateActionType.CHANGE_RS_GET_HISTORY,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/user/${uid}/history`);

      result.handle({
        onSuccess: (response) => {
          const items = response.data.map(
            (item: any) => new HistoryModel(item),
          );

          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_HISTORY,
            payload: RequestStatus.success(items),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_HISTORY,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: HistoryStateActionType.CHANGE_RS_GET_HISTORY,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async getStatistics(uid: string): Promise<void> {
    try {
      this.dispatch({
        type: HistoryStateActionType.CHANGE_RS_GET_STATISTICS,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/user/${uid}/statistics`);

      result.handle({
        onSuccess: (response) => {
          const data = new StatisticsModel(response.data);

          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_STATISTICS,
            payload: RequestStatus.success(data),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_STATISTICS,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: HistoryStateActionType.CHANGE_RS_GET_STATISTICS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async clearHistory(uid: string): Promise<void> {
    this.dispatch({
      type: HistoryStateActionType.CHANGE_RS_CLEAR_HISTORY,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.delete(`/user/${uid}/history/clear`);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: HistoryStateActionType.CHANGE_RS_CLEAR_HISTORY,
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: HistoryStateActionType.CHANGE_RS_CLEAR_HISTORY,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async deleteHistory(history_id: string): Promise<void> {
    this.dispatch({
      type: HistoryStateActionType.CHANGE_RS_DELETE_HISTORY,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.delete(`/history/${history_id}`);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: HistoryStateActionType.CHANGE_RS_DELETE_HISTORY,
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: HistoryStateActionType.CHANGE_RS_DELETE_HISTORY,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getMostPlayed(uid: string): Promise<void> {
    try {
      this.dispatch({
        type: HistoryStateActionType.CHANGE_RS_GET_MOST_PLAYED,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/user/${uid}/hot`);

      result.handle({
        onSuccess: (response) => {
          const songs = response.data.map(
            (song: any) => new HistoryModel(song),
          );

          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_MOST_PLAYED,
            payload: RequestStatus.success(songs),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_MOST_PLAYED,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: HistoryStateActionType.CHANGE_RS_GET_MOST_PLAYED,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
