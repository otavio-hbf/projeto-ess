import HistoryEntity from "../entities/history.entity";
import SongEntity from "../entities/song.entity";
import TestEntity from "../entities/test.entity";
import UserEntity from "../entities/user.entity";

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {};
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    Database.getInstance().data = {
      tests: [
        new TestEntity({
          id: "89ecc32a-aec7-4b71-adfd-03287e4ca74f",
          name: "Test Seed",
        }),
      ],
      songs: [
        new SongEntity({
          id: "1",
          title: "Peanut",
          duration: 45,
          artist: "Spongebob",
          genre: "Rock",
        }),
        new SongEntity({
          id: "2",
          title: "Watermelon",
          duration: 23,
          artist: "Spongebob",
          genre: "MPB",
        }),
        new SongEntity({
          id: "3",
          title: "Apple",
          duration: 78,
          artist: "Spongebob",
          genre: "MPB",
        }),
      ],
      users: [
        new UserEntity({
          id: "1",
          name: "Alfonso",
          email: "alfonso@gmail.com",
          password: "123456",
          history_tracking: true,
        }),
        new UserEntity({
          id: "2",
          name: "João",
          email: "joao@gmail.com",
          password: "789456",
          history_tracking: true,
        }),
      ],
      history: [
        new HistoryEntity({
          id: "",
          user_id: "1",
          song_id: "2",
        }),
        new HistoryEntity({
          id: "",
          user_id: "1",
          song_id: "2",
        }),
        new HistoryEntity({
          id: "",
          user_id: "1",
          song_id: "2",
        }),
        new HistoryEntity({
          id: "",
          user_id: "2",
          song_id: "3",
        }),
        new HistoryEntity({
          id: "",
          user_id: "2",
          song_id: "1",
        }),
        new HistoryEntity({
          id: "",
          user_id: "1",
          song_id: "2",
        }),
        new HistoryEntity({
          id: "",
          user_id: "1",
          song_id: "3",
        }),
      ],
    };
  }
}
