export class HttpError extends Error {
  status: number;
  message: string;
  title?: string;
  constructor(status: number, message: string, title?: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.title = title;
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message, 'Bad request');
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message, 'Unauthorized');
  }
}

export class NotFoundError extends HttpError {
  constructor(message?: string) {
    super(404, message || 'Resource not found', 'Not found');
  }
}

export class InternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message, 'Internal server error');
  }
}

export class NotImplementedError extends HttpError {
  constructor(message: string) {
    super(501, message, 'Not implemented');
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message: string) {
    super(429, message, 'Too many requests');
  }
}

// to differenciate from other UnauthorizedError returned from agent
export class RbacUnauthorizedError extends UnauthorizedError {
  constructor(message: string) {
    super(message);
  }
}
