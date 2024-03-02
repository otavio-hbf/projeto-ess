import { AxiosError } from "axios";
import { AppError } from "./app-error";
import BaseApiResponseModel from "../models/BaseApiResponseModel";

/**
 * Abstract class representing an HTTP error.
 * Extends the `AppError` class.
 */
abstract class HttpError extends AppError {
  /**
   * The HTTP status code of the error.
   */
  public readonly statusCode: number;

  /**
   * Constructs a new `HttpError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   * @param statusCode - The HTTP status code of the error.
   */
  protected constructor(
    slug: string,
    message: string,
    stackTrace: string,
    statusCode = -1,
  ) {
    super(slug, message, stackTrace);
    this.statusCode = statusCode;
  }

  /**
   * Returns a string representation of the `HttpError` instance.
   * @returns A string representation of the `HttpError` instance.
   */
  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}, \nstatusCode: ${this.statusCode}`;

  /**
   * Parses an Axios error and returns the corresponding `HttpError` instance.
   * @param error - The Axios error to parse.
   * @returns The corresponding `HttpError` instance.
   */
  static parseHttpError(error: AxiosError): HttpError {
    let msg = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    const slug = error.response?.statusText;

    if (error.response?.data) {
      const baseApiResponseModel = new BaseApiResponseModel(
        error.response?.data as any,
      );

      msg = HttpError.mapMsgCodeToMessage(baseApiResponseModel.msgCode);
    }

    switch (error.response?.status) {
      case 400:
        return new HttpBadRequestError({
          slug: slug,
          message: msg,
        });
      case 401:
        return new HttpUnauthorizedError({
          slug: slug,
          message: msg,
        });
      case 403:
        return new HttpForbiddenError({
          slug: slug,
          message: msg,
        });
      case 404:
        return new HttpNotFoundError({
          slug: slug,
          message: msg,
        });
      case 410:
        return new HttpGoneError({
          slug: slug,
          message: msg,
        });
      case 500:
        return new HttpInternalServerError({
          slug: slug,
          message: msg,
        });
      default:
        return new HttpUnknownError({
          slug: slug,
          message: msg,
        });
    }
  }

  /**
   * Maps a message code to its corresponding error message.
   * @param msgCode - The message code to map.
   * @returns The corresponding error message.
   */
  static mapMsgCodeToMessage(msgCode: string): string {
    switch (msgCode) {
      case "test_not_found":
        return "Teste não encontrado.";
      default:
        return "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }
  }
}

/**
 * Class representing an unknown HTTP error.
 * Extends the `HttpError` class.
 */
class HttpUnknownError extends HttpError {
  /**
   * Constructs a new `HttpUnknownError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({
    slug = "unknown",
    message = "Unknown error",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace);
  }
}

/**
 * Class representing a HTTP bad request error.
 * Extends the `HttpError` class.
 */
class HttpBadRequestError extends HttpError {
  /**
   * Constructs a new `HttpBadRequestError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({
    slug = "bad_request",
    message = "Bad request",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace, 400);
  }
}

/**
 * Class representing a HTTP unauthorized error.
 * Extends the `HttpError` class.
 */
class HttpUnauthorizedError extends HttpError {
  /**
   * Constructs a new `HttpUnauthorizedError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({
    slug = "unauthorized",
    message = "Unauthorized",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace, 401);
  }
}

/**
 * Class representing a HTTP forbidden error.
 * Extends the `HttpError` class.
 */
class HttpForbiddenError extends HttpError {
  /**
   * Constructs a new `HttpForbiddenError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({ slug = "forbidden", message = "Forbidden", stackTrace = "" }) {
    super(slug, message, stackTrace, 403);
  }
}

/**
 * Class representing a HTTP not found error.
 * Extends the `HttpError` class.
 */
class HttpNotFoundError extends HttpError {
  /**
   * Constructs a new `HttpNotFoundError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({ slug = "not_found", message = "Not found", stackTrace = "" }) {
    super(slug, message, stackTrace, 404);
  }
}

/**
 * Class representing a HTTP gone error.
 * Extends the `HttpError` class.
 */
class HttpGoneError extends HttpError {
  /**
   * Constructs a new `HttpGoneError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({ slug = "gone", message = "Gone", stackTrace = "" }) {
    super(slug, message, stackTrace, 410);
  }
}

/**
 * Class representing a HTTP internal server error.
 * Extends the `HttpError` class.
 */
class HttpInternalServerError extends HttpError {
  /**
   * Constructs a new `HttpInternalServerError` instance.
   * @param slug - The error slug.
   * @param message - The error message.
   * @param stackTrace - The error stack trace.
   */
  constructor({
    slug = "internal_server_error",
    message = "Internal server error",
    stackTrace = "",
  }) {
    super(slug, message, stackTrace, 500);
  }
}

export {
  HttpError,
  HttpUnknownError,
  HttpBadRequestError,
  HttpUnauthorizedError,
  HttpForbiddenError,
  HttpNotFoundError,
  HttpGoneError,
  HttpInternalServerError,
};
