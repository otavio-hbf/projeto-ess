import HistoryRepository from "../repositories/history.repository";
import HistoryModel from "../models/history.model";
import { HttpNotFoundError } from "../utils/errors/http.error";
import HistoryEntity from "../entities/history.entity";
import UserRepository from "../repositories/user.repository";

class HistoryServiceMessageCode {
  public static readonly history_not_found = "history_not_found";
}

class HistoryService {
  private historyRepository: HistoryRepository;
  //   private userRepository: UserRepository;
  //   private songRepository: SongRepository;

  constructor(
    historyRepository: HistoryRepository
    // userRepository: UserRepository
    // songRepository: SongRepository
  ) {
    this.historyRepository = historyRepository;
    // this.userRepository = userRepository;
    // this.songRepository = songRepository;
  }

  public async getHistories(): Promise<HistoryModel[]> {
    const historiesEntity = await this.historyRepository.getHistories();

    const historiesModel = historiesEntity.map(
      (history) => new HistoryModel(history)
    );

    return historiesModel;
  }

  public async getUserHistory(id: string): Promise<HistoryModel[]> {
    const historiesEntity = (
      await this.historyRepository.getHistories()
    ).filter((item) => item.user_id === id);

    const historiesModel = historiesEntity.map(
      (history) => new HistoryModel(history)
    );

    return historiesModel;
  }

  public async getHistory(id: string): Promise<HistoryModel> {
    // const userEntity = await this.userRepository.getUser(id);
    const historyEntity = await this.historyRepository.getHistory(id);

    if (!historyEntity) {
      throw new HttpNotFoundError({
        msg: "History not found",
        msgCode: HistoryServiceMessageCode.history_not_found,
      });
    }

    const historyModel = new HistoryModel(historyEntity);

    return historyModel;
  }

  public async createHistory(data: HistoryEntity): Promise<HistoryModel> {
    const historyEntity = await this.historyRepository.createHistory(data);
    const historyModel = new HistoryModel(historyEntity);

    return historyModel;
  }

  public async updateHistory(
    id: string,
    data: HistoryEntity
  ): Promise<HistoryModel> {
    const historyEntity = await this.historyRepository.updateHistory(id, data);

    if (!historyEntity) {
      throw new HttpNotFoundError({
        msg: "History not found",
        msgCode: HistoryServiceMessageCode.history_not_found,
      });
    }

    const historyModel = new HistoryModel(historyEntity);

    return historyModel;
  }

  public async deleteHistory(id: string): Promise<void> {
    await this.historyRepository.deleteHistory(id);
  }
}

export default HistoryService;
