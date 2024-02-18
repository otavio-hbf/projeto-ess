import HistoryEntity from "../entities/history.entity";
import SongEntity from "../entities/song.entity";
import TestEntity from "../entities/test.entity";
import UserEntity from "../entities/user.entity";
import PlaylistEntity from "../entities/playlist.entity";

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
        new SongEntity({
          id: "4",
          title: "Banana",
          duration: 60,
          artist: "Patrick",
          genre: "Pop",
        }),
        new SongEntity({
          id: "5",
          title: "Orange",
          duration: 50,
          artist: "Squidward",
          genre: "Electronic",
        }),
        new SongEntity({
          id: "6",
          title: "Grape",
          duration: 55,
          artist: "Plankton",
          genre: "Jazz",
        }),
        new SongEntity({
          id: "7",
          title: "Strawberry",
          duration: 40,
          artist: "Sandy",
          genre: "Rock",
        }),
        new SongEntity({
          id: "8",
          title: "Pineapple",
          duration: 35,
          artist: "Mr. Krabs",
          genre: "Hip Hop",
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
      playlists: [
        new PlaylistEntity({
          id: "1",
          name: "My Favorites",
          songs: ["1", "2", "3"], // Song IDs ranging from 1 to 3
          createdBy: "1", // User ID 1 created this playlist
          private: false,
          followers: [],
        }),
        new PlaylistEntity({
          id: "2",
          name: "Road Trip Playlist",
          songs: ["1", "2", "3"], // Song IDs ranging from 1 to 3
          createdBy: "2", // User ID 2 created this playlist
          private: false,
          followers: [],
        }),
        new PlaylistEntity({
          id: "3",
          name: "Chill Vibes",
          songs: ["2", "3"], // Song IDs ranging from 2 to 3
          createdBy: "1", // User ID 1 created this playlist
          private: false,
          followers: [],
        }),
        new PlaylistEntity({
          id: "4",
          name: "Workout Beats",
          songs: ["1", "3"], // Song IDs ranging from 1 to 3
          createdBy: "2", // User ID 2 created this playlist
          private: true,
          followers: [],
        }),
        new PlaylistEntity({
          id: "123",
          name: "Afternoon Sessions",
          songs: [],
          createdBy: "Pedro",
          private: true,
          followers: [],
        }),
      ],
    };
  }
}
