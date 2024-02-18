import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di'
import TestRepository from '../../src/repositories/test.repository';

import UserRepository from "../../src/repositories/user.repository";
import UserEntity from "../../src/entities/user.entity";
import UserService from '../../src/services/user.service';

const feature = loadFeature('tests/features/user-service.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    let mockTestRepository: TestRepository;
    
    let mockUserRepository: UserRepository;
    let mockUserEntity: UserEntity;
    let service: UserService;

    let response: supertest.Response;
    let status;

    beforeEach(() => {
        mockTestRepository = di.getRepository<TestRepository>(TestRepository);
    });

    test('Registration successful', ({ given, when, then }) => {
        given('the system does not have an account with the email “ze@gmail.com” registered', () => {
            
        });

        when(/^a "(.*)" request was sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {
            /*response = await request.arg0(arg1).send({
                name: testName,
              });*/
        });

        then(/^the system registers the new email account “ze@gmail.com” and password “ze(\d+)”$/, (arg0) => {

        });
    });

    test('Login successful', ({ given, when, then, and }) => {
        given(/^the system has the account with email “ze@gmail.com” and password “ze(\d+)” registered$/, (arg0) => {

        });

        when(/^a GET request was sent to "(.*)" with the request body being a JSON with email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and(/^the user with email "(.*)" is logged in$/, (arg0) => {

        });
    });

    test('Delete user', ({ given, when, and, then }) => {
        given(/^the system has the account with email “ze@gmail.com” and password “ze(\d+)” registered$/, (arg0) => {

        });

        when(/^the system receives a request to delete the account with email "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^the system deletes the email account "(.*)"$/, (arg0) => {

        });

        then(/^the system does not have the email account "(.*)" registered$/, (arg0) => {

        });
    });

    test('Update user', ({ given, when, then }) => {
        given(/^the system has the account with email “ze@gmail.com” and password “ze(\d+)” registered$/, (arg0) => {

        });

        when(/^a PUT request is sent to "(.*)" with the request body being a JSON with email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });
    });

    test('Unsuccessful registration', ({ given, when, then }) => {
        given('the system has an account with the email “ze@gmail.com” registered', () => {

        });

        when(/^a POST request was sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2, arg3) => { 

        });

        then(/^the system registers the new email account “ze@gmail.com” and password “ze(\d+)”$/, (arg0) => {

        });
    });

    test('Unsuccessful login', ({ given, when, then, and }) => {
        given(/^the system has the account with email “ze@gmail.com” and password “ze(\d+)” registered$/, (arg0) => {

        });

        when(/^a GET request was sent to "(.*)" with the request body being a JSON with email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2) => {

        });

        then(/^the response status should be (\d+)$/, (arg0) => {

        });

        and(/^the user with email "(.*)" is logged in$/, (arg0) => {

        });
    });
});