import UserEntity from "../entities/user.entity";
import BaseRepository from "./base.repository";

class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super("users");
  }

  public async getUsers(): Promise<UserEntity[]> {
    return await this.findAll();
  }

  public async getUser(id: string): Promise<UserEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async getUserToLogin(
    email: string,
    password: string
  ): Promise<UserEntity | null> {
    return await this.findOne(
      (item) => item.email === email && item.password === password
    );
  }

  public async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOne((item) => item.email === email);
  }

  public async createUser(data: UserEntity): Promise<UserEntity> {
    return await this.add(data);
  }

  public async updateUser(
    id: string,
    data: UserEntity
  ): Promise<UserEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteUser(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }

  public async listenTo(user_id: string, song_id: string): Promise<UserEntity> {
    const user = await this.getUser(user_id);

    if (user) {
      user.listening_to = song_id;

      await this.updateUser(user_id, user);
      return user;
    } else {
      throw new Error("Song not found");
    }
  }
}

export default UserRepository;
