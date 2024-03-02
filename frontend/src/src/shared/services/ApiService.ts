import axios, { AxiosError, AxiosInstance } from "axios";
import { FailureResult, Result, SuccessResult } from "../types/result";
import { AppUnknownError } from "../errors/app-error";
import { HttpError, HttpUnauthorizedError } from "../errors/http-error";
import BaseApiResponseModel from "../models/BaseApiResponseModel";

/**
 * Service class for making API requests.
 */
export class ApiService {
  private httpClient: AxiosInstance;

  /**
   * Constructs an instance of ApiService.
   * @param httpClient - Optional AxiosInstance to use for making HTTP requests.
   */
  constructor({
    httpClient = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
    }),
  }: {
    httpClient?: AxiosInstance;
  }) {
    this.httpClient = httpClient;
  }

  /**
   * Get the headers for the API requests.
   * @returns The headers object.
   */
  get headers() {
    // TODO: add token to headers
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  /**
   * Handles HTTP errors and returns a FailureResult.
   * @param error - The error object.
   * @returns A FailureResult containing the error.
   */
  handleHttpError(error: Error | AxiosError) {
    if (axios.isAxiosError(error)) {
      const httpError: HttpError = HttpError.parseHttpError(error);

      if (httpError instanceof HttpUnauthorizedError) {
        // TODO: handle unauthorized error
      }

      return new FailureResult(httpError);
    }

    return new FailureResult(new AppUnknownError());
  }

  /**
   * Makes a GET request to the specified path.
   * @param path - The path for the GET request.
   * @param queryParams - Optional query parameters for the request.
   * @returns A Promise that resolves to a Result containing the response data.
   */
  public async get(
    path: string,
    queryParams?: any,
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.get(path, {
        headers: this.headers,
        params: queryParams,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }

  /**
   * Makes a POST request to the specified path.
   * @param path - The path for the POST request.
   * @param body - The request body.
   * @returns A Promise that resolves to a Result containing the response data.
   */
  public async post(
    path: string,
    body: any,
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.post(path, body, {
        headers: this.headers,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }

  /**
   * Makes an UPDATE request to the specified path.
   * @param path - The path for the UPDATE request.
   * @param body - The request body.
   * @returns A Promise that resolves to a Result containing the response data.
   */
  public async update(
    path: string,
    body: any,
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.put(path, body, {
        headers: this.headers,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }

  /**
   * Makes a DELETE request to the specified path.
   * @param path - The path for the DELETE request.
   * @param queryParams - Optional query parameters for the request.
   * @returns A Promise that resolves to a Result containing the response data.
   */
  public async delete(
    path: string,
    queryParams?: any,
  ): Promise<Result<BaseApiResponseModel>> {
    try {
      const response = await this.httpClient.delete(path, {
        headers: this.headers,
        params: queryParams,
      });

      const baseApiResponseModel = new BaseApiResponseModel(response.data);

      return new SuccessResult(baseApiResponseModel);
    } catch (e) {
      const error = e as Error | AxiosError;

      return this.handleHttpError(error);
    }
  }
}
