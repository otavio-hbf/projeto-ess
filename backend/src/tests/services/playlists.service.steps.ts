import { loadFeature, defineFeature } from 'jest-cucumber';
import supertest from 'supertest';
import app from '../../src/app';
import PlaylistRepository from '../../src/repositories/playlist.repository';
import PlaylistEntity from '../../src/entities/playlist.entity';
import PlaylistService from '../../src/services/playlist.service';
import UserEntity from "../../src/entities/user.entity";

const feature = loadFeature('tests/features/playlist-service.feature');
const request = supertest(app);

defineFeature(feature, (test) => {
    // Mock do repositório
    let mockPlaylistRepository: PlaylistRepository;

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

        playlistService = new PlaylistService(mockPlaylistRepository);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('Create a New Playlist', ({ given, when, then, and }) => {
        given(
            /^a user with id "(.*)" is logged-in$/,
            (username) => {
                
            }
        );

        when(/^a "(.*)" request is sent to "(.*)" with the playlist name "(.*)" and user id "(.*)"$/, async (req_type, req_url, name, userId) => {
            response = await request.post(req_url).send({
                name: name,
                createdBy: userId,
              });           
            }
        );

        then(
            /^the response status should be "(.*)"$/,
            (status_code) => {
            }
        );

        and(
            /^the response JSON should contain the created playlist with name "(.*)"$/,
            (playlistName) => {
            }
        );
    });

    test('Add a Song to an Existing Playlist', ({ given, and, when, then }) => {
        given(/^the PlaylistService returns a logged-in user with name "(.*)" and password "(.*)"$/, (arg0, arg1) => {

        });

        and(/^there is a playlist with the name "(.*)"$/, (arg0) => {

        });

        and(/^there is a song with the title "(.*)"$/, (arg0) => {

        });

        when(/^a "(.*)" request is sent to "(.*)" with the data:$/, (arg0, arg1, docString) => {

        });

        then(/^the response status should be "(.*)"$/, (arg0) => {

        });

        and(/^the playlist "(.*)" should contain the song "(.*)"$/, (arg0, arg1) => {

        });
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
