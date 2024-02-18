import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import PlaylistEntity from '../../src/entities/playlist.entity';
import PlaylistService from '../../src/services/playlist.service';
import SongRepository from "../../src/repositories/song.repository";
import SongEntity from '../../src/entities/song.entity';
import SongService from '../../src/services/song.service';
import UserRepository from '../../src/repositories/user.repository';
import UserEntity from '../../src/entities/user.entity';
import UserModel from "../../src/models/user.model";
import UserService from '../../src/services/user.service';
import Injector from "../../src/di/injector";
import { di } from "../../src/di/index";
import { mock } from "node:test";


const feature = loadFeature('tests/features/playlist-service.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // Mock do repositório
    let mockPlaylistRepository: PlaylistRepository;
    let mockSongRepository: SongRepository;
    let mockUserRepository: UserRepository;

    let playlistService: PlaylistService;
    let songService: SongService;
    let userService: UserService;

    let mockUserModel: UserModel;
    
    let mockPlaylistEntity: PlaylistEntity;
    let mockSongEntity: SongEntity;
    let mockUserEntity: UserEntity;

    let injector: Injector = di;

    beforeEach(() => {
        injector.registerRepository(PlaylistRepository, new PlaylistRepository());
        mockPlaylistRepository = injector.getRepository(PlaylistRepository);

        injector.registerRepository(SongRepository, new SongRepository());
        mockSongRepository = injector.getRepository(SongRepository);
    
        injector.registerRepository(UserRepository, new UserRepository());
        mockUserRepository = injector.getRepository(UserRepository);

        injector.registerService(
            PlaylistService,
            new PlaylistService(mockPlaylistRepository, mockSongRepository)
          );
          playlistService = injector.getService(PlaylistService);
      
        injector.registerService(SongService, new SongService(mockSongRepository));
        songService = injector.getService(SongService);
    
        injector.registerService(UserService, new UserService(mockUserRepository));
        userService = injector.getService(UserService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Create a New Playlist', ({ given, when, then, and }) => {
        let response: supertest.Response;
        given(
            /^a user with id "(.*)" is logged-in$/,
            async (userId) => {
                mockUserEntity = new UserEntity({ 
                    id: userId,
                    name: "Alfonso",
                    password: "12334",
                    email: "alfonso@gmail.com",
                    history_tracking: true,
                    listening_to: "", });

                jest.spyOn(mockUserRepository, "createUser");

                await userService.createUser(mockUserEntity);
            
                expect(mockUserRepository.createUser).toHaveBeenCalledTimes(1);
            }
        );

        when(/^a POST request is sent to "(.*)" with the playlist name "(.*)" and user id "(.*)"$/, async (req_url, name, userId) => {
            response = await request.post(req_url).send({
                name: name,
                createdBy: userId,
              });
            }
        );

        then(
            /^the response status should be "(.*)"$/,
            async (status_code) => {
                expect(response.status).toBe(parseInt(status_code));
            }
        );

        and(
            /^the response JSON should contain the created playlist with name "(.*)"$/,
            async (playlistName) => {
                const responseBody = response.body.data;
                expect(responseBody.name).toBe(playlistName);
            }
        );
    });

    test('Add a Song to an Existing Playlist', ({ given, when, then, and }) => {
        let response: supertest.Response;
        given(
            /^a user with id "(.*)" is logged-in$/,
            (userId) => {
                // Configure o usuário fictício, se necessário
            }
        );

        and(
            /^there is an existing playlist with id "(.*)" named "(.*)" created by user "(.*)"$/,
            (playlistId, playlistName, createdBy) => {

            }
        );

        and(
            /^there is an existing song with id "(.*)" named "(.*)" by "(.*)"$/,
            (songId, songTitle, artist) => {

            }
        );

        when(
            /^a "(.*)" request is sent to "(.*)" with user id "(.*)"$/,
            async (reqType, reqUrl, userId) => {

            }
        );

        then(
            /^the response status should be "(.*)"$/,
            (statusCode) => {

            }
        );

        and(
            /^the response JSON should contain the updated playlist with the added song id "(.*)" in the list of songs$/,
            (addedSongId) => {

            }
        );
    });

    test('Delete an Existing Playlist', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is a playlist with the name "(.*)"$/, (arg0) => {

        });

        when(/^a "(.*)" request is sent to "(.*)"$/, (arg0, arg1) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and(/^the playlist "(.*)" should no longer exist$/, (arg0) => {

        });
    });

    test('View All Available Playlists', ({ given, when, then, and }) => {
        given('the PlaylistService returns a list of playlists', () => {

        });

        when(/^a "(.*)" request is sent to "(.*)"$/, (arg0, arg1) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and('the response JSON should be a list of playlists', () => {

        });

        and(/^the playlist "(.*)" should be in the list$/, (arg0) => {

        });

        and(/^the playlist "(.*)" should be in the list$/, (arg0) => {

        });
    });

    test('Edit Playlist Name', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is a playlist with the name "(.*)"$/, (arg0) => {

        });

        when(/^a "(.*)" request is sent to "(.*)" with the data:$/, (arg0, arg1, docString) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and(/^the playlist "(.*)" should exist$/, (arg0) => {

        });

        and(/^the playlist "(.*)" should no longer exist$/, (arg0) => {

        });
    });

    test('Delete Song from Playlist', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is a playlist with the name "(.*)"$/, (arg0) => {

        });

        and(/^there is a song with the title "(.*)"$/, (arg0) => {

        });

        when(/^a "(.*)" request is sent to "(.*)"$/, (arg0, arg1) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and(/^the playlist "(.*)" should not contain the song "(.*)"$/, (arg0, arg1) => {

        });
    });

    test('View All Songs in a Playlist', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is a playlist with the name "(.*)"$/, (arg0) => {

        });

        and('there are songs in the playlist', () => {

        });

        when(/^a "(.*)" request is sent to "(.*)"$/, (arg0, arg1) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and('the response JSON should be a list of songs in the playlist', () => {

        });
    });

    test('Create Playlist with Existing Name', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is a playlist with the name "(.*)"$/, (arg0) => {

        });

        when(/^a "(.*)" request is sent to "(.*)" with the data:$/, (arg0, arg1, docString) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and('the response JSON should contain an error message indicating the name is already in use', () => {

        });
    });

    test('Delete Nonexistent Playlist', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is no playlist with the name "(.*)"$/, (arg0) => {

        });

        when(/^a "(.*)" request is sent to "(.*)"$/, (arg0, arg1) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and('the response JSON should contain an error message indicating the playlist does not exist', () => {

        });
    });
});
