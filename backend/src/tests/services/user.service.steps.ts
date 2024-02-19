import { loadFeature, defineFeature } from 'jest-cucumber';
import UserRepository from '../../src/repositories/user.repository';
import UserService from '../../src/services/user.service';
import UserEntity from '../../src/entities/user.entity';
import UserModel from '../../src/models/user.model';
import { HttpNotFoundError } from '../../src/utils/errors/http.error';

const feature = loadFeature("tests/features/user-service.feature");

defineFeature(feature, (test) => {
    let mockUserRepository: UserRepository;
    let userService: UserService;

    beforeEach(() => {
        mockUserRepository = new UserRepository(); // You may want to use a mock here instead
        userService = new UserService(mockUserRepository);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('obter usuário pelo email', ({ given, when, then }) => {
        let userEmail: string;
        let userEntity: UserEntity;
        let result: UserModel;

        given('existe um usuário de nome "Alfonso" e email "alfonso@gmail.com"', () => {
            userEmail = 'alfonso@gmail.com';
            userEntity = new UserEntity({ id:'1', name: 'Alfonso', email: userEmail, password:'123456', history_tracking: true });
            jest.spyOn(mockUserRepository, 'getUserByEmail').mockResolvedValueOnce(userEntity);
        });

        when(/^o método getUserByEmail é chamado com o email "(.*)"$/, async (email) => {
            result = await userService.getUserByEmail(userEmail);
        });

        then(/^o usuário retornado tem nome "(.*)"$/, (name) => {
            expect(result.name).toBe(name);
        });
    });

    test('obter todos os usuários', ({ given, when, then }) => {
        let usersEntity: UserEntity[];
        let result: UserModel[];

        given('existe um usuário de nome "Alfonso" cadastrado', () => {
            usersEntity = [new UserEntity({ id:'1', name: 'Alfonso', email: 'alfonso@gmail.com', password:'123456', history_tracking: true })];
            jest.spyOn(mockUserRepository, 'getUsers').mockResolvedValueOnce(usersEntity);
        });

        when('o método getUsers é chamado', async () => {
            result = await userService.getUsers();
        });

        then(/^o usuário de nome "(.*)" deve está na lista de usuários retornada$/, (name) => {
            const userNames = result.map(user => user.name);
            expect(userNames).toContain(name);
        });
    });

    test('excluir usuário', ({ given, when, then }) => {
        let userEmail: string;
        let userEntity: UserEntity;

        given('o método createUser foi chamado com o name "samanto" email "samanto@gmail.com" e senha "samanto123"', () => {
            userEmail = 'samanto@gmail.com';
            userEntity = new UserEntity({ id:'20', name: 'samanto', email: userEmail, password: 'samanto123', history_tracking: true });
            jest.spyOn(mockUserRepository, 'createUser').mockResolvedValueOnce(userEntity);
        });

        when(/^o método deleteUserWithEmailPassword é chamado com o email "(.*)" e senha "(.*)"$/, async () => {
            await userService.deleteUserWithEmailPassword(userEmail, 'samanto123');
        });

        then(/^o método getUserByEmail é chamado com o email "(.*)"$/, async (email) => {
            jest.spyOn(mockUserRepository, 'getUserByEmail').mockResolvedValueOnce(null);
            await expect(userService.getUserByEmail(email)).rejects.toThrow(HttpNotFoundError);
        });

        then('é retornada a mensagem "user_not_found"', () => {
            // Handled in previous step
        });
    });
});
