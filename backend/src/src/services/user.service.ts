import UserRepository from "../repositories/user.repository";
import UserModel from "../models/user.model";
import {
  HttpNotFoundError,
  HttpForbiddenError,
} from "../utils/errors/http.error";
import UserEntity from "../entities/user.entity";
import { validate } from "class-validator";

class UserServiceMessageCode {
  public static readonly user_not_found = "user_not_found";
  public static readonly user_already_exists = "user_already_exists";
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

  public async getUserToLogin(
    email: string,
    password: string
  ): Promise<UserEntity | null> {
    const userEntity = await this.userRepository.getUserToLogin(
      email,
      password
    );

    if (!userEntity) {
      throw new HttpNotFoundError({
        msg: "User not found",
        msgCode: UserServiceMessageCode.user_not_found,
      });
    }

    return userEntity;
  }

  public async createUser(data: UserEntity): Promise<UserModel> {
    const errors = await validate(data);
    const user = await this.userRepository.getUserByEmail(data.email);

    if (user) {
      // Trate o caso em que a playlist não existe
      throw new HttpForbiddenError({
        msg: "user already exist",
        msgCode: UserServiceMessageCode.user_already_exists,
      });
    }

    if (errors.length > 0) {
      // Handle validation errors
      throw new TypeError(
        "Register data is incomplete or not of the correct type"
      );
    }
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
