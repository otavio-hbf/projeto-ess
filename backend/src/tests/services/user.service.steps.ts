import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import PlaylistEntity from '../../src/entities/playlist.entity';
import PlaylistService from '../../src/services/playlist.service';
import UserEntity from "../../src/entities/user.entity";
import SongRepository from "../../src/repositories/song.repository";
import UserRepository from '../../src/repositories/user.repository';

const feature = loadFeature('tests/features/user-service.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // Mock do repositório
    let mockPlaylistRepository: PlaylistRepository;
    let mockSongRepository: SongRepository;
    let mockUserRepository: UserRepository;

    let playlistService: PlaylistService;

    let mockPlaylistEntity: PlaylistEntity;
    let mockUserEntity: UserEntity;

    let response: supertest.Response;

    beforeEach(() => {
        mockPlaylistRepository = {
            getPlaylists: jest.fn(),
            getPlaylist: jest.fn(),
            createPlaylist: jest.fn(),
            updatePlaylist: jest.fn(),
            deletePlaylist: jest.fn(),
        } as any;

        playlistService = new PlaylistService(mockPlaylistRepository, mockSongRepository, mockUserRepository);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Registration successful', ({ given, when, then }) => {
        given('the system does not have an account with the email “ze@gmail.com” registered', () => {
            
        });

        when(/^a "(.*)" request was sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {
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

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and(/^the user with email "(.*)" is logged in$/, (arg0) => {

        });
    });
});