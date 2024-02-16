import { loadFeature, defineFeature } from "jest-cucumber";
import HistoryRepository from "../../src/repositories/history.repository";
import HistoryEntity from "../../src/entities/history.entity";
import HistoryService from "../../src/services/history.service";
import OtherRepository from "../../src/repositories/other.repository";
import HistoryModel from "../../src/models/history.model";
import SongRepository from "../../src/repositories/song.repository";
import SongService from "../../src/services/song.service";
import UserRepository from "../../src/repositories/user.repository";
import UserService from "../../src/services/user.service";
import UserEntity from "../../src/entities/user.entity";
import SongEntity from "../../src/entities/song.entity";
import UserModel from "../../src/models/user.model";
import StatisticsModel from "../../src/models/statistics.model";

const feature = loadFeature("../../features/most_played_songs.feature");

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

  beforeEach(() => {
    mockHistoryRepository = {
      getHistories: jest.fn(),
      getHistory: jest.fn(),
      getUserStatistics: jest.fn(),
      createHistory: jest.fn(),
      updateHistory: jest.fn(),
      deleteHistory: jest.fn(),
      deleteUserHistory: jest.fn(),
    } as any;

    mockSongRepository = {
      getSongs: jest.fn(),
      getSong: jest.fn(),
      createSong: jest.fn(),
      updateSong: jest.fn(),
      deleteSong: jest.fn(),
    } as any;

    mockUserRepository = {
      getUsers: jest.fn(),
      getUser: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as any;

    historyService = new HistoryService(
      mockHistoryRepository,
      mockSongRepository
    );
    songService = new SongService(mockSongRepository);
    userService = new UserService(mockUserRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  /*test("User asks for detailed stats", ({ given, and, when, then }) => {
    given(
      /^I've created a new account with user "(.*)", password "(.*)"$/,
      async (user, password) => {
        // Test code for creating a new account with the given user and password
        mockUserEntity = new UserEntity({
          id: "testId",
          name: user,
          email: "testEmail",
          password: password,
          history_tracking: true,
        });

        jest
          .spyOn(mockUserRepository, "createUser")
          .mockResolvedValue(mockUserEntity);

        await userService.createUser(mockUserEntity);

        expect(mockUserRepository.createUser).toBeCalledWith(mockUserEntity);

        jest
          .spyOn(mockUserRepository, "getUsers")
          .mockResolvedValue([mockUserEntity]);
      }
    );

    and(/^I logged in with user "(.*)", password "(.*)"$/, (user, password) => {
      // Test code for logging in with the given user and password
    });

    and(
      /^I played the song "(.*)", which is "(.*)" minutes long, "(.*)" times, and is from the genre "(.*)" and artist "(.*)"$/,
      async (song, duration, times, genre, artist) => {
        // Test code for playing the song with the given details
        mockSongEntity = new SongEntity({
          id: "testSongId",
          title: song,
          duration: duration,
          artist: artist,
          genre: genre,
        });

        // create song
        jest
          .spyOn(mockSongRepository, "createSong")
          .mockResolvedValue(mockSongEntity);

        await songService.createSong(mockSongEntity);

        // add song to history "times" times

        for (let i = 0; i < parseInt(times); i++) {
          mockHistoryEntity = new HistoryEntity({
            id: `t${i}`,
            user_id: "testId",
            song_id: "testSongId",
          });

          jest
            .spyOn(mockHistoryRepository, "createHistory")
            .mockResolvedValue(mockHistoryEntity);

          await historyService.createHistory(mockHistoryEntity);
        }

        jest
          .spyOn(mockSongRepository, "getSongs")
          .mockResolvedValue([mockSongEntity]);
      }
    );

    when(/^I select "(.*)"$/, (option) => {
      // Test code for selecting the option
    });

    then(
      /^the system will correctly calculate the total play time of my songs as "(.*)" minutes$/,
      async (totalPlayTime) => {
        // Test code for verifying the total play time calculation

        mockStatistics = new StatisticsModel({
          play_duration: parseInt(totalPlayTime),
        });

        jest
          .spyOn(historyService, "getUserStatistics")
          .mockResolvedValue(mockStatistics);

        const statistics = await historyService.getUserStatistics(
          mockUserEntity.id
        );

        expect(statistics.play_duration).toEqual(mockStatistics.play_duration);
      }
    );

    and(
      /^will correctly calculate my most played genre as "(.*)", and my most played song as "(.*)"$/,
      async (mostPlayedGenre, mostPlayedSong) => {
        // Test code for verifying the most played genre calculation
        mockStatistics = new StatisticsModel({
          most_played_genre_name: mostPlayedGenre,
          most_played_song_name: mostPlayedSong,
        });

        jest
          .spyOn(historyService, "getUserStatistics")
          .mockResolvedValue(mockStatistics);

        const statistics = await historyService.getUserStatistics(
          mockUserEntity.id
        );

        expect(statistics.most_played_genre_name).toEqual(
          mockStatistics.most_played_genre_name
        );
        expect(statistics.most_played_song_name).toEqual(
          mockStatistics.most_played_song_name
        );
      }
    );
  });*/

  test('User asks for detailed stats', ({ given, and, when, then }) => {
    given(/^I've created a new account with user "(.*)", password "(.*)"$/, (arg0, arg1) => {

    });

    and(/^I logged in with user "(.*)", password "(.*)"$/, (arg0, arg1) => {

    });

    and(/^I played the song "(.*)", which is "(.*)" minutes long, "(.*)" times, and is from the genre "(.*)" and artist "(.*)"$/, (arg0, arg1, arg2, arg3, arg4) => {

    });

    when(/^I select "(.*)"$/, (arg0) => {

    });

    then(/^the system will correctly calculate the total play time of my songs as "(.*)" minutes$/, (arg0) => {

    });

    and(/^will correctly calculate my most played genre as "(.*)", and my most played song as "(.*)"$/, (arg0, arg1) => {

    });
});

  test("User requests a new playlist of the most played songs of the month", ({
    given,
    and,
    when,
    then,
  }) => {
    given(
      /^I'm logged in with user "(.*)", password "(.*)"$/,
      (arg0, arg1) => {}
    );

    and(
      /^I have the songs "(.*)", "(.*)", and "(.*)" in my most played songs$/,
      (arg0, arg1, arg2) => {}
    );

    when("I request a new playlist of my most played songs", () => {});

    then(/^the system generates a playlist titled "(.*)"$/, (arg0) => {});

    and(
      /^includes "(.*)", "(.*)", and "(.*)" in the playlist$/,
      (arg0, arg1, arg2) => {}
    );

    and("allows me to save it for future listening", () => {});
  });

  test("User requests a new playlist based on most played genre", ({
    given,
    and,
    when,
    then,
  }) => {
    given("I'm logged in as an user", () => {});

    and(
      /^I have songs from the genres "(.*)", "(.*)", and "(.*)" in my most played list$/,
      (arg0, arg1, arg2) => {}
    );

    and(
      /^I have played songs from the "(.*)" genre "(.*)" times$/,
      (arg0, arg1) => {}
    );

    and(
      /^I have played songs from the "(.*)" genre "(.*)" times$/,
      (arg0, arg1) => {}
    );

    and(
      /^I have played songs from the "(.*)" genre "(.*)" times$/,
      (arg0, arg1) => {}
    );

    when("I request a new playlist based on the most played genre", () => {});

    then(
      /^the system identifies "(.*)" as the predominant genre among my most played songs$/,
      (arg0) => {}
    );

    and(/^generates a playlist titled "(.*)"$/, (arg0) => {});

    and("allows me to save it for future listening", () => {});
  });

  test("New user who has never played a song before", ({
    given,
    and,
    when,
    then,
  }) => {
    given(
      /^I've created a new account with user "(.*)", password "(.*)"$/,
      (arg0, arg1) => {}
    );

    and(/^I logged in with user "(.*)", password "(.*)"$/, (arg0, arg1) => {});

    and("I have no songs in my history", () => {});

    when("I open my most played songs", () => {});

    then(/^I see a message "(.*)"$/, (arg0) => {});
  });

  test("User attempts to access most played songs without logging in", ({
    given,
    when,
    then,
    and,
  }) => {
    given("I am not logged into the system", () => {});

    when("I attempt to view my most played songs", () => {});

    then(
      "the system displays an error message prompting me to log in",
      () => {}
    );

    and("does not show any song statistics or information", () => {});
  });

  test("User turns off tracking of play history", ({
    given,
    when,
    and,
    then,
  }) => {
    given(
      /^I am logged in with user "(.*)", password "(.*)"$/,
      (arg0, arg1) => {}
    );

    when("I go to settings", () => {});

    and("I choose to turn off the tracking of my play history", () => {});

    then(
      "the system confirms that play history tracking is turned off",
      () => {}
    );

    and("my future plays are not recorded in my play history", () => {});
  });

  test("User clears play history", ({ given, and, when, then }) => {
    given(
      /^I am logged in with user "(.*)", password "(.*)"$/,
      (arg0, arg1) => {}
    );

    and(
      /^I have the songs "(.*)" and "(.*)" in my play history$/,
      (arg0, arg1) => {}
    );

    when("I go to settings", () => {});

    and("I select the option to clear my play history", () => {});

    then("the system deletes all my previously stored play history", () => {});

    and("now I do not have any songs in my play history", () => {});
  });

  test("User has disabled tracking of play history", ({
    given,
    and,
    when,
    then,
  }) => {
    given(
      /^I am logged in with user "(.*)", password "(.*)"$/,
      (arg0, arg1) => {}
    );

    and(
      "I have disabled the tracking of my play history in settings",
      () => {}
    );

    when("I attempt to view my most played songs", () => {});

    then("the system displays an empty list", () => {});

    and(
      "the system indicates that play history tracking is disabled",
      () => {}
    );

    and("does not provide any most played song information", () => {});
  });

  test("User asks for most played songs", ({ given, and, when, then }) => {
    given(
      /^I am logged in with user "(.*)", password "(.*)"$/,
      (arg0, arg1) => {}
    );

    and("I have played songs before", () => {});

    when("I open my most played songs", () => {});

    then(
      "the system will display me a list of my most played songs of the month",
      () => {}
    );
  });
});
