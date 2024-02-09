import { Router, Request, Response } from "express";
import { Result, SuccessResult } from "../utils/result";
import PlaylistService from "../services/playlist.service";
import PlaylistEntity from "../entities/playlist.entity";

class PlaylistController {
  private prefix: string = "/playlists";
  public router: Router;
  private playlistService: PlaylistService;

  constructor(router: Router, playlistService: PlaylistService) {
    this.router = router;
    this.playlistService = playlistService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getPlaylists(req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getPlaylist(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createPlaylist(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updatePlaylist(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deletePlaylist(req, res)
    );
  }

  private async getPlaylists(req: Request, res: Response) {
    const playlists = await this.playlistService.getPlaylists();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlists,
    }).handle(res);
  }

  private async getPlaylist(req: Request, res: Response) {
    const playlist = await this.playlistService.getPlaylist(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlist,
    }).handle(res);
  }

  private async createPlaylist(req: Request, res: Response) {
    const playlist = await this.playlistService.createPlaylist(
      new PlaylistEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlist,
    }).handle(res);
  }

  private async updatePlaylist(req: Request, res: Response) {
    const playlist = await this.playlistService.updatePlaylist(
      req.params.id,
      new PlaylistEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlist,
    }).handle(res);
  }

  private async deletePlaylist(req: Request, res: Response) {
    await this.playlistService.deletePlaylist(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default PlaylistController;
