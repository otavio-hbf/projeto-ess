export default class UserModel {
  id: string;
  name: string;
  email: string;
  password?: string;
  history_tracking: boolean;

  constructor(data: UserModel) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.history_tracking = data.history_tracking;
  }
}
