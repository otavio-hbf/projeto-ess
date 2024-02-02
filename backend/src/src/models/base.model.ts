import { IsString } from "class-validator";
export default class BaseModel {
  @IsString()
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
