import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import { di } from '../../src/di'
import TestRepository from '../../src/repositories/test.repository';

import UserRepository from "../../src/repositories/user.repository";
import UserEntity from "../../src/entities/user.entity";
import UserService from '../../src/services/user.service';

const feature = loadFeature('../features/user-service.feature');
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
        given(/^the system does not have an account with the email "(.*)" registered$/, async(name) => {
            
        });

        when(/^uma requisição post foi enviada para "(.*)" com o corpo da requisição sendo um JSON com nome "(.*)" email "(.*)" e senha "(.*)"$/, async (url, nome, email, password) => {
            response = await request.post(url).send({
                name: nome,
                email: email,
                password: password,
            })
            response.status
        });

        then(/^o sistema registra a nova conta de e-mail “(.*)" e senha "(.*)"$/, async (email, senha) => {
            response = await request.get(url)
        });
    });

    test('Login successful', ({ given, when, then }) => {
        given(/^the system has the account with email “(.*)" and password "(.*)" registered$/, async(email, password) => {
            response = 
            expect(response);
        });

        when(/^the system receives a login attempt with the email and password fields filled in with "(.*)" and "(.*)", respectively$/, async (url, nome, email, password) => {
            
        });

        then(/^o sistema registra a nova conta de e-mail “(.*)" e senha “(.*)"$/, async (email, senha) => {
            //msg: "login realizado com sucesso" [abstraindo a parte da homepage pois ainda nao foi criada]
        });
    });
});