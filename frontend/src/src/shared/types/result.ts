import { AppError, AppUnknownError } from "../errors/app-error";

/**
 * Represents a generic result that can either be a success or a failure.
 * @template T - The type of data contained in the result.
 */
export class Result<T> {
  /**
   * Handles the result by invoking the appropriate callback based on the result type.
   * @param callbacks - An object containing the success and failure callbacks.
   * @returns The result of invoking the appropriate callback.
   */
  handle(callbacks: {
    onSuccess: (result: T) => any;
    onFailure: (result: AppError) => any;
  }): any {
    if (this instanceof SuccessResult) {
      return callbacks.onSuccess(this.data);
    } else if (this instanceof FailureResult) {
      return callbacks.onFailure(this.error);
    }
  }
}

/**
 * Represents a success result that contains a data value.
 * @template T - The type of data contained in the result.
 */
export class SuccessResult<T> extends Result<T> {
  /**
   * The data value contained in the success result.
   */
  data: T;

  /**
   * Creates a new instance of SuccessResult.
   * @param data - The data value to be contained in the success result.
   */
  constructor(data: T) {
    super();
    this.data = data;
  }
}

/**
 * Represents a failure result that contains an error.
 * @template T - The type of data contained in the result.
 */
export class FailureResult<T> extends Result<T> {
  /**
   * The error contained in the failure result.
   */
  error: AppError;

  /**
   * Creates a new instance of FailureResult.
   * @param error - The error to be contained in the failure result. Defaults to AppUnknownError if not provided.
   */
  constructor(error: AppError = new AppUnknownError()) {
    super();
    this.error = error;
  }
}
