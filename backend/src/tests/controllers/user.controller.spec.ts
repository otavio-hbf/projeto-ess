import supertest from 'supertest';
import app from '../../src/app';
import UserEntity from '../../src/entities/user.entity';
import UserRepository from '../../src/repositories/user.repository';
import UserService from '../../src/services/user.service';
import { di } from '../../src/di';

const request = supertest(app);

describe('UserController', () => {
    const mockedUserId: string = "87";
    const mockedUser = { 
        id: mockedUserId,
        name: "John",
        email: "john@example.com", 
        password: "password" ,
        history_tracking: true,
    };

    const mockedUserEntity: UserEntity = new UserEntity(mockedUser);
    let mockUserRepository: UserRepository;
    let userService: UserService;

    beforeEach(() => {
        mockUserRepository = di.getRepository(UserRepository);
        userService = di.getService(UserService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return users', async () => {
        //const createdUserEntity = await userService.createUser(mockedUserEntity)
        const response = await request.get('/api/users').send();
        const result = response.body.data;

        expect(response.status).toBe(200);
        //expect(result).toContain(createdUserEntity);
        // You may want to add more detailed assertions here based on the expected response
    });

    it('should return a user by id', async () => {
        const createdUserEntity = await userService.createUser(mockedUserEntity)
        const response = await request.get('/api/users/' + mockedUserId).send();
        const result = response.body.data;

        expect(response.status).toBe(200);
        expect(result).toEqual(createdUserEntity);
    });

    it('should throw an error when user is not found by id', async () => {
        const response = await request.get('/api/users/1111').send();
        const result = response.body.msgCode;

        expect(response.status).toBe(404);
        expect(result).toEqual('user_not_found');
    });

    it('should create a user', async () => {
        const createUserData = { name: "basilia", email: "pbgs@cin.unibra.br", password: "pedin" };
        const response = await request.post('/api/users').send(createUserData);
        const result = response.body.data;

        expect(response.status).toBe(200);
        expect(result).toEqual(
            expect.objectContaining({
            name: "basilia",
            email: "pbgs@cin.unibra.br",
            })
        );
    });

    it('should update a user', async () => {
        const userEntityData = { id: "99", name: "messi", email: "messi@mls.com", password: "messi123", history_tracking: true };
        await userService.createUser(userEntityData);
        const updateUserData = { name: "Updated User", email: userEntityData.email, password: userEntityData.password };
        const response = await request.put('/api/users/' + userEntityData.id).send(updateUserData);
        const result = response.body.data;


        expect(response.status).toBe(200);
        expect(result).toEqual(
            expect.objectContaining({
            name: 'Updated User',
            })
        );
    });

    it('should delete a user', async () => {
        const response = await request.delete('/api/users/' + mockedUserId).send();

        expect(response.status).toBe(200);
    });
});
