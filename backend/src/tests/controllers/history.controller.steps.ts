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
import { simpleAddSongsToHistory } from "../utils/history.utils";

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
    mockHistoryRepository = di.getRepository(HistoryRepository);

    mockSongRepository = di.getRepository(SongRepository);

    mockUserRepository = di.getRepository(UserRepository);

    historyService = di.getService(HistoryService);

    songService = di.getService(SongService);

    userService = di.getService(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

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

    when(/^I send a "(.*)" request to "(.*)"$/, async (req_type, route) => {
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
      (arg0, table) => {}
    );

    when(/^I send a "(.*)" request to "(.*)"$/, (arg0, arg1) => {});

    then(/^the response status should be "(.*)"$/, (arg0) => {});

    and(
      "the response JSON should contain a list with the following songs in order:",
      (table) => {}
    );
  });

  test("Get user statistics from user id", ({ given, when, then, and }) => {
    given(
      /^the user with id "(.*)" has a history with the following items:$/,
      (arg0, table) => {}
    );

    when(/^I send a "(.*)" request to "(.*)"$/, (arg0, arg1) => {});

    then(/^the response status should be "(.*)"$/, (arg0) => {});

    and(
      "the response JSON should contain the following statistics:",
      (table) => {}
    );
  });

  test("Add a new song to a user history", ({ given, when, then, and }) => {
    given(/^the user with id "(.*)" has no history$/, (arg0) => {});

    when(
      /^I send a "(.*)" request to "(.*)" with the following JSON:$/,
      (arg0, arg1, docString) => {}
    );

    then(/^the response status should be "(.*)"$/, (arg0) => {});

    and(
      /^the response JSON should contain a history with (\d+) item with song_id "(.*)"$/,
      (arg0, arg1) => {}
    );
  });

  test("Clear user history", ({ given, when, and, then }) => {
    given(
      /^the user with id "(.*)" has (\d+) history entries$/,
      (arg0, arg1) => {}
    );

    when(/^I send a "(.*)" request to "(.*)"$/, (arg0, arg1) => {});

    and(/^I send a "(.*)" request to "(.*)"$/, (arg0, arg1) => {});

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

    when(/^I send a "(.*)" request to "(.*)"$/, (arg0, arg1) => {});

    and(/^I send a "(.*)" request to "(.*)"$/, (arg0, arg1) => {});

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
