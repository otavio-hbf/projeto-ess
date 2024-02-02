import BaseModel from "./base.model";

export default class UserModel extends BaseModel {
  name: string;
  email: string;

  constructor(data: UserModel) {
    super(data.id || "");
    this.name = data.name;
    this.email = data.email;
  }
}
