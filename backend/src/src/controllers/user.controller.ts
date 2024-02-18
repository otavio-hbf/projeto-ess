import { Router, Request, Response } from "express";
import { Result, SuccessResult } from "../utils/result";
import UserService from "../services/user.service";
import UserEntity from "../entities/user.entity";
import { FailureResult } from "../utils/result";
import {
  HttpNotFoundError,
  HttpUnauthorizedError,
  HttpForbiddenError,
} from "../utils/errors/http.error";

class UserController {
  private prefix: string = "/users";
  public router: Router;
  private userService: UserService;

  constructor(router: Router, userService: UserService) {
    this.router = router;
    this.userService = userService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getUsers(req, res)
    );
    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getUser(req, res)
    );
    this.router.post(`${this.prefix}/login`, (req: Request, res: Response) =>
      this.getUserToLogin(req, res)
    );
    this.router.get(
      `${this.prefix}/:user_id/listen/:song_id`,
      (req: Request, res: Response) => this.listenTo(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createUser(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateUser(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteUser(req, res)
    );
    this.router.delete(`${this.prefix}`, (req: Request, res: Response) =>
      this.deleteUserWithEmailPassword(req, res)
    );
  }

  private async getUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: users,
    }).handle(res);
  }

  private async getUserToLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar se o email esta presentes
      if (!email) {
        return res.status(400).json({ error: "A email is required for login" });
      }

      // Validar se a senha esta presentes
      if (!password) {
        return res.status(400).json({ error: "A senha is required for login" });
      }

      const user = await this.userService.getUserToLogin(
        req.body.email,
        req.body.password
      );

      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: user,
      }).handle(res);
    } catch (error) {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        msgCode: "user_login_fail",
        code: 500,
      }).handle(res);
    }
  }

  private async getUser(req: Request, res: Response) {
    const user = await this.userService.getUser(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user,
    }).handle(res);
  }

  private async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // Validar se o nome esta presente
      if (!name) {
        return res
          .status(400)
          .json({ error: "A name is required for register" });
      }

      // Validar se o email esta presente
      if (!email) {
        return res
          .status(400)
          .json({ error: "A email is required for register" });
      }

      // Validar se a senha esta presente
      if (!password) {
        return res
          .status(400)
          .json({ error: "A password is required for register" });
      }
      const user = await this.userService.createUser(new UserEntity(req.body));

      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: user,
      }).handle(res);
    } catch (error) {
      if (error instanceof HttpForbiddenError) {
        return new FailureResult({
          msg: Result.transformRequestOnMsg(req),
          msgCode: "user_already_exists",
          code: 403,
        }).handle(res);
      }

      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        msgCode: "user_register_fail",
        code: 500,
      }).handle(res);
    }
  }

  private async updateUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    // Validar se o nome esta presente
    if (!name) {
      return res.status(400).json({ error: "A name is required for update" });
    }

    // Validar o email esta presente
    if (!email) {
      return res.status(400).json({ error: "A email is required for update" });
    }

    // Validar o password esta presente
    if (!password) {
      return res
        .status(400)
        .json({ error: "A password is required for update" });
    }

    const user = await this.userService.updateUser(
      req.params.id,
      new UserEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user,
    }).handle(res);
  }

  private async deleteUser(req: Request, res: Response) {
    await this.userService.deleteUser(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }

  private async deleteUserWithEmailPassword(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ error: "A email is required for delete" });
      }

      if (!password) {
        return res
          .status(400)
          .json({ error: "A senha is required for delete" });
      }

      await this.userService.deleteUserWithEmailPassword(
        req.body.email,
        req.body.password
      );

      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
      }).handle(res);
    } catch (error) {
      return new FailureResult({
        msg: Result.transformRequestOnMsg(req),
        msgCode: "user_delete_fail",
        code: 500,
      }).handle(res);
    }
  }

  private async listenTo(req: Request, res: Response) {
    const user = await this.userService.listenTo(
      req.params.user_id,
      req.params.song_id
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: user,
    }).handle(res);
  }
}

export default UserController;
