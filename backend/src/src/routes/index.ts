import { Express, Router } from "express";
import { di } from "../di";
import SongController from "../controllers/song.controller";
import SongService from "../services/song.service";
import UserController from "../controllers/user.controller";
import UserService from "../services/user.service";
import HistoryController from "../controllers/history.controller";
import HistoryService from "../services/history.service";
import PlaylistController from "../controllers/playlist.controller";
import PlaylistService from "../services/playlist.service";
import HotPageService from "../services/hotPage.service";
import HotPageController from "../controllers/hotPage.controller";

const router = Router();
const prefix = "/api";

export default (app: Express) => {
  app.use(
    prefix,
    new SongController(router, di.getService(SongService)).router,
    new UserController(router, di.getService(UserService)).router,
    new HistoryController(router, di.getService(HistoryService)).router,
    new PlaylistController(router, di.getService(PlaylistService)).router,
    new HotPageController(router, di.getService(HotPageService)).router
  );
};
