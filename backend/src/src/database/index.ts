import SongEntity from '../entities/song.entity';
import TestEntity from '../entities/test.entity';

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
          id: '89ecc32a-aec7-4b71-adfd-03287e4ca74f',
          name: 'Test Seed',
        }),
      ],
      songs: [
        new SongEntity({
          id: '1',
          title: 'Peanut',
          duration: 45,
          artist: "Spongebob",
          genre: "Rock"
        }),
        new SongEntity({
          id: '2',
          title: 'Watermelon',
          duration: 23,
          artist: "Spongebob",
          genre: "MPB"
        }),
        new SongEntity({
          id: '3',
          title: 'Apple',
          duration: 78,
          artist: "Spongebob",
          genre: "MPB"
        }),
      ]
    };
  }
}
