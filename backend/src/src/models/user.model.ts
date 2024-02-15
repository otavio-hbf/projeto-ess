import BaseModel from "./base.model";

export default class UserModel extends BaseModel {
  name: string;
  email: string;
  history_tracking: boolean;
  listening_to: string;

  constructor(data: UserModel) {
    super(data.id || "");
    this.name = data.name;
    this.email = data.email;
    this.history_tracking = data.history_tracking;
    this.listening_to = data.listening_to;
  }
}
