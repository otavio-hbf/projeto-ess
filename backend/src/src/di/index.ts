import OtherRepository from "../repositories/other.repository";
import SongRepository from "../repositories/song.repository";
import TestRepository from "../repositories/test.repository";
import SongService from "../services/song.service";
import TestService from "../services/test.service";
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
