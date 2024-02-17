import HistoryRepository from "../repositories/history.repository";
import OtherRepository from "../repositories/other.repository";
import SongRepository from "../repositories/song.repository";
import TestRepository from "../repositories/test.repository";
import UserRepository from "../repositories/user.repository";
import PlaylistRepository from "../repositories/playlist.repository";
import HistoryService from "../services/history.service";
import SongService from "../services/song.service";
import TestService from "../services/test.service";
import UserService from "../services/user.service";
import PlaylistService from "../services/playlist.service";
import Injector from "./injector";

export const di = new Injector();

// Test
di.registerRepository(TestRepository, new TestRepository());
di.registerRepository(OtherRepository, new OtherRepository());
di.registerService(
  TestService,
  new TestService(
    di.getRepository(TestRepository),
    di.getRepository(OtherRepository)
  )
);

// Song
di.registerRepository(SongRepository, new SongRepository());
di.registerService(
  SongService,
  new SongService(di.getRepository(SongRepository))
);

// User
di.registerRepository(UserRepository, new UserRepository());
di.registerService(
  UserService,
  new UserService(di.getRepository(UserRepository))
);

// History
di.registerRepository(HistoryRepository, new HistoryRepository());
di.registerService(
  HistoryService,
  new HistoryService(
    di.getRepository(HistoryRepository),
    di.getRepository(SongRepository)
  )
);

// Playlist
di.registerRepository(PlaylistRepository, new PlaylistRepository());
di.registerService(
  PlaylistService,
  new PlaylistService(
    di.getRepository(PlaylistRepository),
    di.getRepository(UserRepository)
  )
);
