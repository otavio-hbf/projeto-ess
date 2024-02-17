import { Router, Request, Response } from "express";
import { Result, SuccessResult } from "../utils/result";
import PlaylistService from "../services/playlist.service";
import PlaylistEntity from "../entities/playlist.entity";

class PlaylistController {
  private prefix: string = "/playlists";
  private sufix: string = "/search";
  public router: Router;
  private playlistService: PlaylistService;

  constructor(router: Router, playlistService: PlaylistService) {
    this.router = router;
    this.playlistService = playlistService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.prefix}${this.sufix}`,
      (req: Request, res: Response) => this.searchPlaylists(req, res)
    );

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

    this.router.put(
      `${this.prefix}/follow/:userId/:playlistId`,
      (req: Request, res: Response) => this.followPlaylist(req, res)
    );
    this.router.put(
      `${this.prefix}/unfollow/:userId/:playlistId`,
      (req: Request, res: Response) => this.unfollowPlaylist(req, res)
    );

    this.router.put(
        `${this.prefix}/addContributor/:playlistId/:userId`,
        (req: Request, res: Response) => this.addContributor(req, res)
    );
    this.router.put(
        `${this.prefix}/removeContributor/:playlistId/:userId`,
        (req: Request, res: Response) => this.removeContributor(req, res)
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

  private async searchPlaylists(req: Request, res: Response) {
    const keyword: string = req.query.keyword as string;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword is required" });
    }

    const playlists = await this.playlistService.searchPlaylists(keyword);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: playlists,
    }).handle(res);
  }

  private async followPlaylist(req: Request, res: Response) {
    const playlistId: string = req.params.playlistId;
    const userId: string = req.params.userId;

    await this.playlistService.followPlaylist(playlistId, userId);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }

  private async unfollowPlaylist(req: Request, res: Response) {
    const playlistId: string = req.params.playlistId;
    const userId: string = req.params.userId;

    await this.playlistService.unfollowPlaylist(playlistId, userId);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }

  private async addContributor(req: Request, res: Response) {
    const playlistId: string = req.params.playlistId;
    const userId: string = req.params.userId;
    const ownerId: string = req.body.ownerId;

    try {
      await this.playlistService.addContributor(playlistId, userId, ownerId);
      return new SuccessResult({
        msg: "Contributor added successfully",
      }).handle(res);
    } catch (error) {
      throw error;
    }
  }

  private async removeContributor(req: Request, res: Response) {
    const playlistId: string = req.params.playlistId;
    const userId: string = req.params.userId;
    const ownerId: string = req.body.ownerId;

    try {
      await this.playlistService.removeContributor(
        playlistId,
        userId,
        ownerId
      );
      return new SuccessResult({
        msg: "Contributor removed successfully",
      }).handle(res);
    } catch (error) {
      throw error;
    }
  }
}

export default PlaylistController;
