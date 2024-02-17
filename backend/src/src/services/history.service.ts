import HistoryRepository from "../repositories/history.repository";
import HistoryModel from "../models/history.model";
import { HttpNotFoundError } from "../utils/errors/http.error";
import HistoryEntity from "../entities/history.entity";
import UserRepository from "../repositories/user.repository";
import MostPlayedModel from "../models/most_played.model";
import SongRepository from "../repositories/song.repository";
import { log } from "console";
import StatisticsModel from "../models/statistics.model";

class HistoryServiceMessageCode {
  public static readonly history_not_found = "history_not_found";
}

class HistoryService {
  private historyRepository: HistoryRepository;
  //   private userRepository: UserRepository;
  private songRepository: SongRepository;

  constructor(
    historyRepository: HistoryRepository,
    // userRepository: UserRepository
    songRepository: SongRepository
  ) {
    this.historyRepository = historyRepository;
    // this.userRepository = userRepository;
    this.songRepository = songRepository;
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

  public async getUserMostPlayedList(id: string): Promise<MostPlayedModel[]> {
    let historiesEntity = await this.historyRepository.getHistories();
    if (!historiesEntity) {
      throw new HttpNotFoundError({
        msg: "History not found",
        msgCode: HistoryServiceMessageCode.history_not_found,
      });
    } else {
      historiesEntity = historiesEntity.filter((item) => item.user_id === id);
    }

    // if song is found in history, increment times_played, create new mostPlayedModel if not found
    const mostPlayedModel: MostPlayedModel[] = [];

    for (const history of historiesEntity) {
      const song = await this.songRepository.getSong(history.song_id);

      // If the song is not found in database, skip it
      if (!song) {
        continue;
      }

      const songName = song.title;

      const existingMostPlayed = mostPlayedModel.find(
        (item) => item.song_id === history.song_id
      );

      if (existingMostPlayed?.times_played) {
        existingMostPlayed.times_played++;
      } else {
        const newMostPlayed = new MostPlayedModel({
          song_id: history.song_id,
          song_name: songName,
          song_duration: song?.duration,
          song_genre: song?.genre,
          times_played: 1,
        });
        mostPlayedModel.push(newMostPlayed);
      }
    }

    return mostPlayedModel;
  }

  public async getUserStatistics(id: string): Promise<StatisticsModel> {
    const mostPlayedList = await this.getUserMostPlayedList(id);
    // iterate through mostPlayedList to find the most played song genre. also, keep track of the total duration of all songs

    let mostPlayedSong: MostPlayedModel | undefined;
    let mostPlayedGenre: string | undefined;
    let totalDuration: number = 0;

    for (const mostPlayed of mostPlayedList) {
      if (mostPlayed) {
        // find most played song
        if (
          !mostPlayedSong ||
          mostPlayed.times_played > mostPlayedSong.times_played
        ) {
          mostPlayedSong = mostPlayed;
        }

        // find most played genre
        if (!mostPlayedGenre) {
          mostPlayedGenre = mostPlayed.song_genre;
        } else if (mostPlayed.times_played > mostPlayedSong.times_played) {
          mostPlayedGenre = mostPlayed.song_genre;
        }

        // find total duration
        totalDuration +=
          mostPlayed.song_duration * mostPlayed.times_played || 0;
      }
    }

    return new StatisticsModel({
      most_played_genre: mostPlayedGenre,
      most_played_song: mostPlayedSong?.song_name,
      time_played: totalDuration,
    });
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

  public async deleteUserHistory(id: string): Promise<void> {
    await this.historyRepository.deleteUserHistory(id);
  }
}

export default HistoryService;
