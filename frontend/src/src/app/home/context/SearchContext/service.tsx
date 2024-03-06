/**
 * Service class for handling API requests related to the HomeContext in the application.
 */
import { Dispatch } from "react";
import { SearchStateAction, SearchStateActionType} from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import SongModel from "../../models/SongModel";
import PlaylistModel from "../../models/PlaylistModel";

export default class HomeService {
  private apiService: ApiService;
  private dispatch: Dispatch<SearchStateAction>;

  /** 
   
   * @param apiService The ApiService instance used for making API requests.
   * @param dispatch T
   */
  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<SearchStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  /**
   * Creates a new test.
   * 
   * @returns 
   */
  async searchSongs(query: string): Promise<SongModel[]> {
    this.dispatch({
      type: SearchStateActionType.CHANGE_RS_GET_SEARCH_SONGS,
      payload: RequestStatus.loading(),
    });
    let ret = [];
    const result = await this.apiService.get(`/feed/search/songs/?keyword=${query}`);
    
    result.handle({
      onSuccess: (response) => {
        const items = response.data.map((item: any) => new SongModel(item));

        this.dispatch({
          type: SearchStateActionType.CHANGE_RS_GET_SEARCH_SONGS,
          payload: RequestStatus.success(items),
        });
        
        ret = items
      },
      onFailure: (error) => {
        this.dispatch({
          type: SearchStateActionType.CHANGE_RS_GET_SEARCH_SONGS,
          payload: RequestStatus.failure(error),
        });

        ret = [];
      },
    });

    return ret;
  }

  /**

   * @returns A promise that resolves when the tests are retrieved.
   */
  async searchPlaylists(query: string): Promise<PlaylistModel[]> {
    let ret = [];
    try {
      this.dispatch({
        type: SearchStateActionType.CHANGE_RS_GET_SEARCH_PLAYLISTS,
        payload: RequestStatus.loading(),
      });
      
      const result = await this.apiService.get(`/feed/search/playlists/?keyword=${query}`);

      result.handle({
        onSuccess: (response) => {
          const items = response.data.map((item: any) => new PlaylistModel(item));
  
          this.dispatch({
            type: SearchStateActionType.CHANGE_RS_GET_SEARCH_PLAYLISTS,
            payload: RequestStatus.success(items),
          });

          ret = items;
        },
        onFailure: (error) => {
          this.dispatch({
            type: SearchStateActionType.CHANGE_RS_GET_SEARCH_PLAYLISTS,
            payload: RequestStatus.failure(error),
          });

          ret = []
        },
      });
    } catch (_) {
      this.dispatch({
        type: SearchStateActionType.CHANGE_RS_GET_SEARCH_PLAYLISTS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }

    return ret;
  }
}
