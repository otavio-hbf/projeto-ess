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

        when(/^a POST request is sent to "(.*)" with the request body being a JSON with name "(.*)" email "(.*)" and password "(.*)"$/, (arg0, arg1, arg2, arg3) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        then(/^the system registers the new email account “ze@gmail.com” and password “ze(\d+)”$/, (arg0) => {

        });
    });

});