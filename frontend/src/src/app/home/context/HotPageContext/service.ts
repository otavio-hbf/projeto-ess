/**
 * Service class for handling API requests related to the FeedContext in the application.
 */
import { Dispatch } from "react";
import { HotPageStateAction, HotPageStateActionType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import SongModel from "../../models/SongModel";

export default class HotPageService {
  private apiService: ApiService;
  private dispatch: Dispatch<HotPageStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<HotPageStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async getHotSongs(genre?: string): Promise<void> {
    try {
      this.dispatch({
        type: HotPageStateActionType.CHANGE_RS_GET_HOT_SONGS,
        payload: RequestStatus.loading(),
      });
      let result;
      if (genre) {
        result = await this.apiService.get(`/hot?genre=${genre}`);
      } else {
        result = await this.apiService.get("/hot");
      }
      result.handle({
        onSuccess: (response) => {
          const items = response.data.map((item: any) => new SongModel(item));

          this.dispatch({
            type: HotPageStateActionType.CHANGE_RS_GET_HOT_SONGS,
            payload: RequestStatus.success(items),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: HotPageStateActionType.CHANGE_RS_GET_HOT_SONGS,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: HotPageStateActionType.CHANGE_RS_GET_HOT_SONGS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}
