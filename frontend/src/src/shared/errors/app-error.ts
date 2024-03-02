/**
 * Represents an abstract class for application errors.
 */
export abstract class AppError {
  /**
   * The slug of the error.
   */
  public readonly slug: string;
  /**
   * The error message.
   */
  public readonly message: string;
  /**
   * The stack trace of the error.
   */
  public readonly stackTrace: string;

  /**
   * Creates an instance of AppError.
   * @param slug - The slug of the error.
   * @param message - The error message.
   * @param stackTrace - The stack trace of the error.
   */
  constructor(slug = "", message = "", stackTrace = "") {
    this.slug = slug;
    this.message = message;
    this.stackTrace = stackTrace;
  }

  /**
   * Returns a string representation of the AppError.
   * @returns A string representation of the AppError.
   */
  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}`;
}

/**
 * Represents an unknown application error.
 */
export class AppUnknownError extends AppError {
  /**
   * Creates an instance of AppUnknownError.
   * @param slug - The slug of the error.
   * @param message - The error message.
   * @param stackTrace - The stack trace of the error.
   */
  constructor(
    slug = "app_unknown_error",
    message = "Unknown error",
    stackTrace = "",
  ) {
    super(slug, message, stackTrace);
  }
}

/**
 * Represents a parse error.
 */
export class ParseError extends AppError {
  /**
   * Creates an instance of ParseError.
   * @param slug - The slug of the error.
   * @param message - The error message.
   * @param stackTrace - The stack trace of the error.
   */
  constructor(slug = "parse_error", message = "Parse error", stackTrace = "") {
    super(slug, message, stackTrace);
  }

  /**
   * Returns a string representation of the ParseError.
   * @returns A string representation of the ParseError.
   */
  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}`;
}

/**
 * Represents an error when an entity does not fit the expected criteria.
 */
export class EntityNotFitError extends AppError {
  /**
   * Creates an instance of EntityNotFitError.
   * @param slug - The slug of the error.
   * @param message - The error message.
   * @param stackTrace - The stack trace of the error.
   */
  constructor(
    slug = "entity_error",
    message = "Entity error",
    stackTrace = "",
  ) {
    super(slug, message, stackTrace);
  }

  /**
   * Returns a string representation of the EntityNotFitError.
   * @returns A string representation of the EntityNotFitError.
   */
  toString = (): string =>
    `[${this.constructor.name}]: \nslug: ${this.slug}, \nmessage: ${this.message}, \nstackTrace: ${this.stackTrace}`;
}
