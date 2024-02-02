import { Express, Router } from "express";
import { di } from "../di";
import TestController from "../controllers/test.controller";
import TestService from "../services/test.service";
import SongController from "../controllers/song.controller";
import SongService from "../services/song.service";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";

const router = Router();
const prefix = "/api";

export default (app: Express) => {
  app.use(
    prefix,
    new TestController(router, di.getService(TestService)).router,
    new SongController(router, di.getService(SongService)).router,
    new UserController(router, di.getService(UserService)).router,
  );
};
