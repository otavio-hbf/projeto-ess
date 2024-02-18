import HistoryEntity from "../../src/entities/history.entity";
import SongEntity from "../../src/entities/song.entity";
import HistoryRepository from "../../src/repositories/history.repository";
import SongRepository from "../../src/repositories/song.repository";
import HistoryService from "../../src/services/history.service";
import SongService from "../../src/services/song.service";

export const addSongsToHistory = async (
  table: any,
  user_id: string,
  mockHistoryRepository: HistoryRepository,
  mockSongRepository: SongRepository,
  songService: SongService,
  historyService: HistoryService
) => {
  let mockSongEntity;
  let mockHistoryEntity;
  // create songs and entries
  jest.spyOn(mockHistoryRepository, "createHistory");
  jest.spyOn(mockSongRepository, "createSong");

  for (let row of table) {
    // create songs
    mockSongEntity = new SongEntity({
      id: row.song_id,
      title: row.title,
      artist: row.artist,
      duration: row.duration,
      genre: row.genre,
      times_ever_played: 0,
    });

    let song = await songService.createSong(mockSongEntity);

    // create history entries
    mockHistoryEntity = new HistoryEntity({
      id: "",
      song_id: song.id,
      user_id: user_id,
    });

    for (let i = 0; i < parseInt(row.times_played); i++) {
      await historyService.createHistory(mockHistoryEntity);
    }
  }
  // expect(mockSongRepository.createSong).toHaveBeenCalledTimes(table.length);

  // total_songs added should be equal to the sum of each entry on table.times_played
  let total_songs_added = table.reduce(
    (counter: number, row: any) => counter + parseInt(row.times_played),
    0
  );

  // expect(mockHistoryRepository.createHistory).toHaveBeenCalledTimes(
  //   total_songs_added
  // );
};

export const simpleAddSongsToHistory = async (
  song_1: string,
  song_2: string,
  song_3: string,
  user_id: string,
  historyService: HistoryService
) => {
  // clear user history first
  await historyService.deleteUserHistory(user_id);
  
  let songs = [song_1, song_2, song_3];
  jest.spyOn(historyService, "createHistory")
  for (let song of songs) {
    const mockHistoryEntity = new HistoryEntity({
      id: "",
      user_id: user_id,
      song_id: song,
    });
    await historyService.createHistory(mockHistoryEntity);
  }
  expect(historyService.createHistory).toHaveBeenCalledTimes(3);
};

export const simpleAddSongsToHistoryRep = async (
  song_1: string,
  song_2: string,
  song_3: string,
  user_id: string,
  historyRepository: HistoryRepository
) => {
  // clear user history first
  await historyRepository.deleteUserHistory(user_id);
  
  let songs = [song_1, song_2, song_3];
  jest.spyOn(historyRepository, "createHistory")
  for (let song of songs) {
    const mockHistoryEntity = new HistoryEntity({
      id: "",
      user_id: user_id,
      song_id: song,
    });
    await historyRepository.createHistory(mockHistoryEntity);
  }
  expect(historyRepository.createHistory).toHaveBeenCalledTimes(3);
};
