import { Router, Request, Response } from "express";
import { Result, SuccessResult } from "../utils/result";
import HotPageService from "../services/hotPage.service";
import SongModel from "../models/song.model";

class HotPageController {
  private prefix: string = "/hot";
  public router: Router;
  private hotPageService: HotPageService;

  constructor(router: Router, hotPageService: HotPageService) {
    this.router = router;
    this.hotPageService = hotPageService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(`${this.prefix}`, (req: Request, res: Response) =>
      this.getHotSongs(req, res)
    );
  }

  private async getHotSongs(req: Request, res: Response) {
    let hotSongs: SongModel[] = [];
    if (typeof req.query.genre === "string") {
      hotSongs = await this.hotPageService.getHotSongs(req.query.genre);
    } else if (!req.query.genre) {
      hotSongs = await this.hotPageService.getHotSongs();
    }

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: hotSongs,
    }).handle(res);
  }
}

export default HotPageController;
