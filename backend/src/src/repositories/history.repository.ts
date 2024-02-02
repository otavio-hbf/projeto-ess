import HistoryEntity from "../entities/history.entity";
import BaseRepository from "./base.repository";

class HistoryRepository extends BaseRepository<HistoryEntity> {
  constructor() {
    super("history");
  }

  public async getHistories(): Promise<HistoryEntity[]> {
    return await this.findAll();
  }

  public async getHistory(id: string): Promise<HistoryEntity | null> {
    return await this.findOne((item) => item.user_id === id);
  }

  public async createHistory(data: HistoryEntity): Promise<HistoryEntity> {
    return await this.add(data);
  }

  public async updateHistory(
    id: string,
    data: HistoryEntity
  ): Promise<HistoryEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteHistory(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }

  public async deleteUserHistory(id: string): Promise<void> {
    await this.delete((item) => item.user_id !== id);
  }
}

export default HistoryRepository;
