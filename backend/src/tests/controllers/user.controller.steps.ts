import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import UserEntity from "../../src/entities/user.entity";
import UserRepository from '../../src/repositories/user.repository';
import UserService from '../../src/services/user.service';
import { get } from 'http';

const feature = loadFeature('tests/features/user-route.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // Mock do repositório
    let mockUserRepository: UserRepository;
    let mockUserEntity: UserEntity;

    let userService: UserService;

    let response: supertest.Response;

    beforeEach(() => {
        mockUserRepository = {
            getUsers: jest.fn(),
            getUserToLogin: jest.fn(),
            getUserByEmail: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            deleteUserWithEmailPassword: jest.fn(),
        } as any;

        userService = new UserService(mockUserRepository);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Registration successful', ({ given, when, then, and }) => {
        given(/^the system does not have an account with the email "(.*)" registered$/, (email) => {
            //Não há um usuário com esse email no database
        });

        when(/^a POST request is sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, async (url, name, email, password) => {
            response = await request.post(url).send({
                name,
                email,
                password
            })
        });

        then(/^the response status should be "(.*)"$/, (status_code) => {
            expect(response.status).toBe(parseInt(status_code));
        });
    });

    test('Unsuccessful registration', ({ given, when, then }) => {
        given(/^the system has an account with the email "(.*)" registered$/, async (email) => {
            //Já existe um usuário com esse e-mail no database
        });

        when(/^a POST request is sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, async (url, name, email, password) => {
            response = await request.post(url).send({
                name,
                email,
                password
            })
        });

        then(/^response status shold be "(.*)"$/, (status_code) => {
            expect(response.status).toBe(parseInt(status_code))
        });
    });

    test('Login successful', ({ given, when, then, and }) => {
        given(/^the system has the account with email "(.*)" and password "(.*)" registered$/, (email, password) => {

        });

        when(/^a POST request is sent to "(.*)" with the request body being a JSON with email "(.*)" and password "(.*)"$/, async (url, email, password) => {
            response = await request.post(url).send({
                email,
                password
            })
        });

        then(/^the response status should be "(.*)"$/, (status_code) => {
            expect(response.status).toBe(parseInt(status_code))
        });
    });

    test('Unsuccessful login', ({ given, when, then }) => {
        given(/^the system does not have an account with the email "(.*)" and password "(.*)" registered$/, (email, password) => {
            
        });

        when(/^a POST request is sent to "(.*)" with the request body being a JSON with email "(.*)" and password "(.*)"$/, async (url, email, password) => {
            response = await request.post(url).send({
                email,
                password
            })
            console.log(response.body)
        });

        then(/^the response status should be "(.*)"$/, (status_code) => {
            expect(response.status).toBe(parseInt(status_code))
        });
    });

    test('Delete user', ({ given, when, then, and }) => {
        given(/^the system has the account with email "(.*)" and password "(.*)" registered$/, (email, password) => {

        });

        when(/^a DELETE request is sent to "(.*)" with the request body being a JSON with email "(.*)" and password "(.*)"$/, async (url, email, password) => {
            response = await request.delete(url).send({
                email,
                password
            })
        });

        then(/^the response status shold be "(.*)"$/, (status_code) => {
            expect(response.status).toBe(parseInt(status_code))
        });
    });

    test('Update user', ({ given, when, then, and }) => {
        given(/^a user with id "(.*)" is logged-in$/, async (id) => {
            
        });

        when(/^a PUT request is sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, async (url, name, email, password) => {
            response = await request.put(url).send({
                name,
                email,
                password
            })
        });

        then(/^the response status should be "(.*)"$/, (status_code) => {
            expect(response.status).toBe(parseInt(status_code));
        });

        and(/^the response JSON should contain the updated user with name "(.*)" email "(.*)" and password "(.*)"$/, (name, email, password) => {
            const responseBody = response.body.data;
            expect(responseBody.name).toBe(name);
            expect(responseBody.email).toBe(email);
        });
    });
});