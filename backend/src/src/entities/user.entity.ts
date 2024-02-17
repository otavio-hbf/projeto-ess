import BaseEntity from "./base.entity";
import { IsString, IsBoolean } from "class-validator";

export default class UserEntity extends BaseEntity {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsBoolean()
  history_tracking: boolean;
  listening_to?: string;

  constructor(data: UserEntity) {
    super(data.id || "");
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.history_tracking = data.history_tracking || false;
    this.listening_to = data.listening_to || "";
  }
}
