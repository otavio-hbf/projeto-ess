export default class StatisticsModel {
  most_played_song?: string;
  most_played_genre?: string;
  time_played?: number;

  constructor(data: StatisticsModel) {
    this.most_played_song = data.most_played_song;
    this.most_played_genre = data.most_played_genre;
    this.time_played = data.time_played;
  }
}
