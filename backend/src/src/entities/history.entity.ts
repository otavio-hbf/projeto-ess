import BaseEntity from "./base.entity";
import SongEntity from "./song.entity";
import UserEntity from "./user.entity";
import { IsString } from "class-validator";

export default class HistoryEntity extends BaseEntity {
  @IsString()
  user_id: string;
  @IsString()
  song_id: string;

  constructor(data: HistoryEntity) {
    super(data.id || "");
    this.user_id = data.user_id;
    this.song_id = data.song_id;
  }
}
