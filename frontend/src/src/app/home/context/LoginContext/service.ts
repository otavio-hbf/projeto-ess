import { Dispatch } from "react";
import { LoginStateAction, LoginStateActionType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import { UserSchema } from "../../forms/UserSchema";
import UserModel from "../../models/UserModel";
import { userInfo } from "os";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default class PlaylistService {
  private apiService: ApiService;
  private dispatch: Dispatch<LoginStateAction>;

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<LoginStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async getUsers(): Promise<void> {
    try {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_GET_USERS,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(`/users`);

      result.handle({
        onSuccess: (response) => {
          const users = response.data; 

          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_GET_USERS,
            payload: RequestStatus.success(users),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_GET_USERS,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_GET_USERS,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async getUserToLogin(email: string, password: string): Promise<void> {
    try {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_GET_USER,
        payload: RequestStatus.loading(),
      });

      const body = {
        email,
        password,
      };

      const result = await this.apiService.post(`/users/login`, body);
      console.log(result);

      result.handle({
        onSuccess: (response) => {
          const user = response.data;

          alert("Login realizado com sucesso!");

          const cookies = new Cookies();
          cookies.set("userId", user.id, { path: "/" });
          window.location.href = "/feed";
          console.log(cookies.get("userId"));

          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_GET_USER,
            payload: RequestStatus.success(user),
          });
        },
        onFailure: (error) => {
          alert("Usuário e/ou senha incorretos, tente novamente");
          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_GET_USER,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_GET_USER,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_CREATE_USER,
        payload: RequestStatus.loading(),
      });

      const body = {
        name,
        email,
        password,
      };

      const result = await this.apiService.post("/users", body);

      result.handle({
        onSuccess: (response) => {
          alert("Cadastro realizado com sucesso!");

          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_CREATE_USER,
            payload: RequestStatus.success(response.data),
          });
        },
        onFailure: (error) => {
          alert(
            "Ops! Este email já está cadastrado, tente novamente com outro email.",
          );

          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_CREATE_USER,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_CREATE_USER,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async updateUser(userId: string, userModel: UserModel): Promise<void> {
    try {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_UPDATE_USER,
        payload: RequestStatus.loading(),
      });

      const body = {
        userId,
        userModel,
      };

      const result = await this.apiService.update(`/users`, body);

      console.log(body);

      result.handle({
        onSuccess: (response) => {
          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_UPDATE_USER,
            payload: RequestStatus.success(response.data),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: LoginStateActionType.CHANGE_RS_UPDATE_USER,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: LoginStateActionType.CHANGE_RS_UPDATE_USER,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }

  async deleteuSER(email: string, password: string): Promise<void> {
    this.dispatch({
      type: LoginStateActionType.CHANGE_RS_DELETE_USER,
      payload: RequestStatus.loading(),
    });

    const body = {
      email,
      password,
    };

    const result = await this.apiService.delete(`/users`, body);

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: LoginStateActionType.CHANGE_RS_DELETE_USER,
          payload: RequestStatus.success(response),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: LoginStateActionType.CHANGE_RS_DELETE_USER,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}
