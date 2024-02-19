import supertest from 'supertest';
import app from '../../src/app';
import UserRepository from '../../src/repositories/user.repository';
import UserService from '../../src/services/user.service';
import UserEntity from '../../src/entities/user.entity';
import UserModel from '../../src/models/user.model';
import { HttpNotFoundError, HttpForbiddenError } from '../../src/utils/errors/http.error';

const request = supertest(app);

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    userService = new UserService(userRepository);
  });

  describe('User Methods', () => {
    it('should get users', async () => {
      const usersEntity: UserEntity[] = [
        new UserEntity({ id: '1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true }),
        new UserEntity({ id: '2', name: 'Doe', email: 'doe@example.com', password: 'password', history_tracking: true }),
      ];
      jest.spyOn(userRepository, 'getUsers').mockResolvedValueOnce(usersEntity);

      const result = await userService.getUsers();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.any(UserModel),
          expect.any(UserModel),
        ]),
      );
    });

    it('should get user by id', async () => {
      const userId = '1';
      const userEntity = new UserEntity({ id: userId, name: 'John', email: 'john@example.com', password: 'password', history_tracking: true });
      jest.spyOn(userRepository, 'getUser').mockResolvedValueOnce(userEntity);

      const result = await userService.getUser(userId);

      expect(result).toEqual(expect.any(UserModel));
    });

    it('should throw error when user is not found by id', async () => {
      const userId = '1';
      jest.spyOn(userRepository, 'getUser').mockResolvedValueOnce(null);

      await expect(userService.getUser(userId)).rejects.toThrow(HttpNotFoundError);
    });

    it('should get user by email for login', async () => {
      const userEmail = 'john@example.com';
      const userEntity = new UserEntity({ id: '1', name: 'John', email: userEmail, password: 'password', history_tracking: true });
      jest.spyOn(userRepository, 'getUserToLogin').mockResolvedValueOnce(userEntity);

      const result = await userService.getUserToLogin(userEmail, 'password');

      expect(result).toEqual(expect.any(UserModel));
    });

    it('should throw error when user is not found by email for login', async () => {
      const userEmail = 'john@example.com';
      jest.spyOn(userRepository, 'getUserToLogin').mockResolvedValueOnce(null);

      await expect(userService.getUserToLogin(userEmail, 'password')).rejects.toThrow(HttpNotFoundError);
    });

    it('should create a new user', async () => {
      const userData = new UserEntity({ id: '1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true });
      const userEntity = new UserEntity({ id: '1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true });
      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(null);
      jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce(userEntity);

      const result = await userService.createUser(userData);

      expect(result).toEqual(expect.any(UserModel));
    });

    it('should throw error when trying to create a user with existing email', async () => {
      const userData = new UserEntity({ id:'1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true });
      jest.spyOn(userRepository, 'getUserByEmail').mockResolvedValueOnce(new UserEntity({id: '1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true}));
      
      await expect(userService.createUser(userData)).rejects.toThrow(HttpForbiddenError);
    });

    it('should update a user', async () => {
      const userId = '1';
      const userData = new UserEntity({ id:'1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true });
      const updatedUserEntity = new UserEntity({ id: userId, name: 'Updated John', email: 'john@example.com', password: 'password', history_tracking: true });
      jest.spyOn(userRepository, 'updateUser').mockResolvedValueOnce(updatedUserEntity);

      const result = await userService.updateUser(userId, userData);

      expect(result).toEqual(expect.any(UserModel));
    });

    it('should throw error when user is not found for update', async () => {
      const userId = '1';
      const userData = new UserEntity({ id:'1', name: 'John', email: 'john@example.com', password: 'password', history_tracking: true });
      jest.spyOn(userRepository, 'updateUser').mockResolvedValueOnce(null);

      await expect(userService.updateUser(userId, userData)).rejects.toThrow(HttpNotFoundError);
    });

    it('should delete a user', async () => {
      const userId = '1';
      jest.spyOn(userRepository, 'deleteUser').mockResolvedValueOnce();

      await expect(userService.deleteUser(userId)).resolves.not.toThrow();
    });

    it('should delete a user by email and password', async () => {
      const userEmail = 'john@example.com';
      jest.spyOn(userRepository, 'deleteUserWithEmailPassword').mockResolvedValueOnce();

      await expect(userService.deleteUserWithEmailPassword(userEmail, 'password')).resolves.not.toThrow();
    });
  });
});
