import BaseModel from "./base.model";

export default class UserModel extends BaseModel {
  name: string;
  email: string;
  history_tracking: boolean;

  constructor(data: UserModel) {
    super(data.id || "");
    this.name = data.name;
    this.email = data.email;
    this.history_tracking = data.history_tracking;
  }
}
