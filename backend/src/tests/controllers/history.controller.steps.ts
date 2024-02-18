import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../src/app";
import { di } from "../../src/di";
import HistoryRepository from "../../src/repositories/history.repository";
import SongRepository from "../../src/repositories/song.repository";
import UserRepository from "../../src/repositories/user.repository";
import HistoryService from "../../src/services/history.service";
import SongService from "../../src/services/song.service";
import UserService from "../../src/services/user.service";
import StatisticsModel from "../../src/models/statistics.model";
import UserEntity from "../../src/entities/user.entity";
import HistoryEntity from "../../src/entities/history.entity";
import SongEntity from "../../src/entities/song.entity";
import UserModel from "../../src/models/user.model";
import Injector from "../../src/di/injector";
import {
  addSongsToHistory,
  simpleAddSongsToHistory,
} from "../utils/history.utils";

const feature = loadFeature("./tests/features/history-route.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
  let mockHistoryRepository: HistoryRepository;
  let mockSongRepository: SongRepository;
  let mockUserRepository: UserRepository;

  let historyService: HistoryService;
  let songService: SongService;
  let userService: UserService;

  let mockStatistics: StatisticsModel;

  let mockUserEntity: UserEntity;
  let mockHistoryEntity: HistoryEntity;
  let mockSongEntity: SongEntity;

  let mockUserModel: UserModel;
  let injector: Injector = di;

  let response: supertest.Response;

  const prefix: string = "/api";

  beforeEach(() => {
    mockHistoryRepository =
      di.getRepository<HistoryRepository>(HistoryRepository);

    mockSongRepository = di.getRepository<SongRepository>(SongRepository);

    mockUserRepository = di.getRepository<UserRepository>(UserRepository);

    injector.registerService(
      HistoryService,
      new HistoryService(
        mockHistoryRepository,
        mockUserRepository,
        mockSongRepository
      )
    );
    historyService = injector.getService(HistoryService);

    injector.registerService(SongService, new SongService(mockSongRepository));
    songService = injector.getService(SongService);

    injector.registerService(UserService, new UserService(mockUserRepository));
    userService = injector.getService(UserService);
  });

  //   afterEach(() => {
  //     jest.resetAllMocks();
  //   });

  test("Get user history from user id", ({ given, when, then, and }) => {
    given(
      /^the HistoryService returns a history for user_id "(.*)" with (\d+) items with song_id "(.*)", "(.*)" and "(.*)"$/,
      async (user_id, num_items, song_1, song_2, song_3) => {
        await simpleAddSongsToHistory(
          song_1,
          song_2,
          song_3,
          user_id,
          historyService
        );
      }
    );

    when(/^I send a GET request to "(.*)"$/, async (route) => {
      response = await request.get(`${prefix}${route}`).send();
    });

    then(/^the response status should be "(.*)"$/, (status) => {
      expect(response.status).toBe(parseInt(status));
    });

    and(
      /^the response JSON should contain a history with (\d+) items with song_id "(.*)", "(.*)" and "(.*)"$/,
      (num_items, song_1, song_2, song_3) => {
        expect(response.body.data).toHaveLength(parseInt(num_items));
        expect(response.body.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              song_id: song_1,
            }),
            expect.objectContaining({
              song_id: song_2,
            }),
            expect.objectContaining({
              song_id: song_3,
            }),
          ])
        );
      }
    );
  });

  test("Get most played songs from user id", ({ given, when, then, and }) => {
    given(
      /^the user with id "(.*)" has a history with the following items:$/,
      async (user_id, table) => {
        await addSongsToHistory(
          table,
          user_id,
          mockHistoryRepository,
          mockSongRepository,
          songService,
          historyService
        );
      }
    );
    when(/^I send a GET request to "(.*)"$/, async (route) => {
      response = await request.get(`${prefix}${route}`).send();
    });

    then(/^the response status should be "(.*)"$/, (status) => {
      expect(response.status).toBe(parseInt(status));
    });

    and(
      "the response JSON should contain a list with the following songs in order:",
      (table) => {
        for (let i = 0; i < table.length; i++) {
          expect(response.body.data[i].song_id).toBe(table[i].song_id);
          expect(response.body.data[i].times_played).toBe(
            parseInt(table[i].times_played)
          );
        }
      }
    );
  });

  test("Get user statistics from user id", ({ given, when, then, and }) => {
    given(
      /^the user with id "(.*)" has a history with the following items:$/,
      async (user_id, table) => {
        await addSongsToHistory(
          table,
          user_id,
          mockHistoryRepository,
          mockSongRepository,
          songService,
          historyService
        );
      }
    );

    when(/^I send a GET request to "(.*)"$/, async (route) => {
      response = await request.get(`${prefix}${route}`).send();
    });

    then(/^the response status should be "(.*)"$/, (status) => {
      expect(response.status).toBe(parseInt(status));
    });

    and(
      "the response JSON should contain the following statistics:",
      (table) => {
        let expected = new StatisticsModel({
          time_played: parseInt(table[0].play_duration),
          most_played_genre: table[0].most_played_genre,
          most_played_song: table[0].most_played_song,
        });

        expect(response.body.data).toEqual(expected);
      }
    );
  });

  test("Add a new song to a user history", ({ given, when, then, and }) => {
    given(/^the user with id "(.*)" has no history$/, async (user_id) => {
      // clear user history first
      await historyService.deleteUserHistory(user_id);
    });

    when(
      /^I send a POST request to "(.*)" with the following JSON:$/,
      async (route, docString) => {
        const body = JSON.parse(docString);
        response = await request.post(`${prefix}${route}`).send(body);
        console.debug(response.body);
      }
    );

    then(/^the response status should be "(.*)"$/, (status) => {
      expect(response.status).toBe(parseInt(status));
    });

    and(
      /^the response JSON should contain a history with (\d+) item with song_id "(.*)"$/,
      (num_items, song_id) => {
        expect(response.body.data).toEqual(
          expect.objectContaining({
            song_id: song_id,
          })
        );
      }
    );
  });

  test("Clear user history", ({ given, when, and, then }) => {
    given(
      /^the user with id "(.*)" has (\d+) history entries$/,
      (arg0, arg1) => {}
    );

    when(/^I send a DELETE request to "(.*)"$/, (arg1) => {});

    and(/^I send a GET request to "(.*)"$/, (arg1) => {});

    then(/^the response status should be "(.*)"$/, (arg0) => {});

    and(
      /^the response JSON should contain a history with (\d+) entries$/,
      (arg0) => {}
    );
  });

  test("Delete history entry", ({ given, when, and, then }) => {
    given(
      /^the user with id "(.*)" has (\d+) history entries with ids "(.*)", "(.*)" and "(.*)"$/,
      (arg0, arg1, arg2, arg3, arg4) => {}
    );

    when(/^I send a DELETE request to "(.*)"$/, (arg1) => {});

    and(/^I send a GET request to "(.*)"$/, (arg1) => {});

    then(/^the response status should be "(.*)"$/, (arg0) => {});

    and(
      /^the response JSON should contain a history without the entry that was deleted with id "(.*)"$/,
      (arg0) => {}
    );

    and(
      /^the response JSON should contain a history with ids "(.*)" and "(.*)"$/,
      (arg0, arg1) => {}
    );
  });

  //   test('Create a history', ({ given, when, then, and }) => {
  //     given(/^o HistoryRepository não tem um history com nome "(.*)"$/, async (historyId, historyName) => {
  //       // Check if the history does not exist in the repository and delete it if it exists
  //       const existingHistory = await mockHistoryRepository.getHistory(historyId);
  //       if (existingHistory) {
  //         await mockHistoryRepository.deleteHistory(historyId);
  //       }
  //     });

  //     when(
  //       /^uma requisição POST for enviada para "(.*)" com o corpo da requisição sendo um JSON com o nome "(.*)"$/,
  //       async (url, historyName) => {
  //         response = await request.post(url).send({
  //           name: historyName,
  //         });
  //       }
  //     );

  //     then(/^o status da resposta deve ser "(.*)"$/, (statusCode) => {
  //       expect(response.status).toBe(parseInt(statusCode, 10));
  //     });

  //     and(/^o JSON da resposta deve conter o nome "(.*)"$/, (historyName) => {
  //         expect(response.body.data).toEqual(
  //           expect.objectContaining({
  //             name: historyName,
  //           })
  //         );
  //       }
  //     );
  //   });
});
