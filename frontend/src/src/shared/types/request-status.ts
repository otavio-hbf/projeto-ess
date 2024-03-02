import { RequestStatusEnum } from "../enums/request-status.enum";
import { AppError } from "../errors/app-error";

/**
 * Represents the status of a request.
 * @template T - The type of data returned by the request.
 * @template E - The type of error returned by the request.
 */
export default class RequestStatus<T, E = AppError> {
  status: RequestStatusEnum;

  /**
   * Creates a new RequestStatus instance.
   * @param status - The initial status of the request. Defaults to RequestStatusEnum.Idle.
   */
  constructor(status: RequestStatusEnum = RequestStatusEnum.Idle) {
    this.status = status;
  }

  /**
   * Checks if the request status is idle.
   * @returns True if the status is idle, false otherwise.
   */
  isIdle(): boolean {
    return this.status === RequestStatusEnum.Idle;
  }

  /**
   * Checks if the request status is loading.
   * @returns True if the status is loading, false otherwise.
   */
  isLoading(): boolean {
    return this.status === RequestStatusEnum.Loading;
  }

  /**
   * Checks if the request status is success.
   * @returns True if the status is success, false otherwise.
   */
  isSuccess(): boolean {
    return this.status === RequestStatusEnum.Succeeded;
  }

  /**
   * Checks if the request status is failure.
   * @returns True if the status is failure, false otherwise.
   */
  isFailure(): boolean {
    return this.status === RequestStatusEnum.Failed;
  }

  /**
   * Creates a new RequestStatus instance with idle status.
   * @template T - The type of data returned by the request.
   * @returns A new RequestStatus instance with idle status.
   */
  static idle<T>(): RequestStatusIdle<T> {
    return new RequestStatusIdle();
  }

  /**
   * Creates a new RequestStatus instance with loading status.
   * @template T - The type of data returned by the request.
   * @returns A new RequestStatus instance with loading status.
   */
  static loading<T>(): RequestStatusLoading<T> {
    return new RequestStatusLoading();
  }

  /**
   * Creates a new RequestStatus instance with success status.
   * @template T - The type of data returned by the request.
   * @param data - The data returned by the request.
   * @returns A new RequestStatus instance with success status.
   */
  static success<T>(data: T): RequestStatusSuccess<T> {
    return new RequestStatusSuccess<T>(data);
  }

  /**
   * Creates a new RequestStatus instance with failure status.
   * @template E - The type of error returned by the request.
   * @param error - The error returned by the request.
   * @returns A new RequestStatus instance with failure status.
   */
  static failure<E>(error: E): RequestStatusFailure<E> {
    return new RequestStatusFailure<E>(error);
  }

  /**
   * Maps the request status to a value based on its current status.
   * @template K - The type of value to map the request status to.
   * @param options - An object containing mapping functions for each possible status.
   * @returns The mapped value based on the current status.
   */
  maybeMap<K>({
    idle,
    loading,
    succeeded,
    failed,
    orElse,
  }: {
    idle?: () => K;
    loading?: () => K;
    succeeded?: (data: T) => K;
    failed?: (error: E) => K;
    orElse?: () => K;
  }): K {
    switch (this.status) {
      case RequestStatusEnum.Idle:
        return idle ? idle() : (undefined as unknown as K);
      case RequestStatusEnum.Loading:
        return loading ? loading() : (undefined as unknown as K);
      case RequestStatusEnum.Succeeded:
        if (this instanceof RequestStatusSuccess) {
          return succeeded ? succeeded(this.data) : (undefined as unknown as K);
        } else {
          return undefined as unknown as K;
        }
      case RequestStatusEnum.Failed:
        if (this instanceof RequestStatusFailure) {
          return failed ? failed(this.error) : (undefined as unknown as K);
        } else {
          return undefined as unknown as K;
        }
      default:
        return orElse ? orElse() : (undefined as unknown as K);
    }
  }
}

/**
 * Represents a RequestStatus instance with idle status.
 * @template T - The type of data returned by the request.
 */
class RequestStatusIdle<T> extends RequestStatus<T> {
  constructor() {
    super();
  }
}

/**
 * Represents a RequestStatus instance with loading status.
 * @template T - The type of data returned by the request.
 */
class RequestStatusLoading<T> extends RequestStatus<T> {
  constructor() {
    super(RequestStatusEnum.Loading);
  }
}

/**
 * Represents a RequestStatus instance with success status.
 * @template T - The type of data returned by the request.
 */
class RequestStatusSuccess<T> extends RequestStatus<T> {
  data: T;

  /**
   * Creates a new RequestStatusSuccess instance.
   * @param data - The data returned by the request.
   */
  constructor(data: T) {
    super(RequestStatusEnum.Succeeded);
    this.data = data;
  }
}

/**
 * Represents a RequestStatus instance with failure status.
 * @template E - The type of error returned by the request.
 */
class RequestStatusFailure<E> extends RequestStatus<unknown, E> {
  error: E;

  /**
   * Creates a new RequestStatusFailure instance.
   * @param error - The error returned by the request.
   */
  constructor(error: E) {
    super(RequestStatusEnum.Failed);
    this.error = error;
  }
}
