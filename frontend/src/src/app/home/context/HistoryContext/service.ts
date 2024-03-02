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
          const tests = response.data.map(
            (test: any) => new HistoryModel(test),
          );

          this.dispatch({
            type: HistoryStateActionType.CHANGE_RS_GET_HISTORY,
            payload: RequestStatus.success(tests),
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
}
