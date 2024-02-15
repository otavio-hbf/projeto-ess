import UserRepository from "../repositories/user.repository";
import UserModel from "../models/user.model";
import { HttpNotFoundError } from "../utils/errors/http.error";
import UserEntity from "../entities/user.entity";

class UserServiceMessageCode {
  public static readonly user_not_found = "user_not_found";
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async getUsers(): Promise<UserModel[]> {
    const usersEntity = await this.userRepository.getUsers();

    const usersModel = usersEntity.map((user) => new UserModel(user));

    return usersModel;
  }

  public async getUser(id: string): Promise<UserModel> {
    const userEntity = await this.userRepository.getUser(id);

    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: "User not found",
        msgCode: UserServiceMessageCode.user_not_found,
      });
    }

    const userModel = new UserModel(userEntity);

    return userModel;
  }

  public async createUser(data: UserEntity): Promise<UserModel> {
    const userEntity = await this.userRepository.createUser(data);
    const userModel = new UserModel(userEntity);

    return userModel;
  }

  public async updateUser(id: string, data: UserEntity): Promise<UserModel> {
    const userEntity = await this.userRepository.updateUser(id, data);

    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: "User not found",
        msgCode: UserServiceMessageCode.user_not_found,
      });
    }

    const userModel = new UserModel(userEntity);

    return userModel;
  }

  public async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  public async listenTo(user_id: string, song_id: string): Promise<UserModel> {
    const userEntity = await this.userRepository.listenTo(user_id, song_id);
    const userModel = new UserModel(userEntity);
    return userModel;
  }
}

export default UserService;
