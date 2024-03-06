/**
 * Service class for handling API requests related to the FeedContext in the application.
 */
import { Dispatch } from "react";
import { FeedStateAction, FeedStateActionType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { TestFormType } from "../../forms/TestForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import StatisticsModel from "../../models/StatisticsModel";
import { SongSchema } from "../../forms/SongForm";
import MostPlayedModel from "../../models/MostPlayedModel";
import { log } from "console";
import { UserSchema } from "../../forms/UserSchema";
import UserModel from "../../models/UserModel";
import SongModel from "../../models/SongModel";

export default class FeedService {
  private apiService: ApiService;
  private dispatch: Dispatch<FeedStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<FeedStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async getSongs(): Promise<void> {
    try {
      this.dispatch({
        type: FeedStateActionType.CHANGE_RS_GET_SONGS,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/songs`);
      result.handle({
        onSuccess: (response) => {
          const items = response.data.map((item: any) => new SongModel(item));

          this.dispatch({
            type: FeedStateActionType.CHANGE_RS_GET_SONGS,
            payload: RequestStatus.success(items),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: FeedStateActionType.CHANGE_RS_GET_SONGS,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: FeedStateActionType.CHANGE_RS_GET_SONGS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async getReccomendations(uid: string): Promise<void> {
    try {
      this.dispatch({
        type: FeedStateActionType.CHANGE_RS_GET_RECOMMENDATIONS,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(
        `/feed/user/${uid}/recommendations`,
      );
      result.handle({
        onSuccess: (response) => {
          const items = response.data.map((item: any) => new SongModel(item));

          this.dispatch({
            type: FeedStateActionType.CHANGE_RS_GET_RECOMMENDATIONS,
            payload: RequestStatus.success(items),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: FeedStateActionType.CHANGE_RS_GET_RECOMMENDATIONS,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: FeedStateActionType.CHANGE_RS_GET_RECOMMENDATIONS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
