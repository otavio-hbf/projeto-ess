import BaseModel from "./base.model";
import SongModel from "./song.model";
import UserModel from "./user.model";

export default class HistoryModel extends BaseModel {
  user_id: string;
  song_id: string;

  constructor(data: HistoryModel) {
    super(data.id || "");
    this.user_id = data.user_id;
    this.song_id = data.song_id;
  }
}
