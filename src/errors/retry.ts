import { isEmpty } from 'lodash';
import P, { LogFn } from 'pino';

export interface LevelError {
  level(logger: P.Logger): LogFn;
}

export class LevelError extends Error {
  // We are implementing the LevelError interface so that
  // clients know that when logging this error use warn
  // instead of error. This is needed so that we don't
  // use error in certain cases (since we alert on these).
  level(logger: P.Logger): LogFn {
    return logger.warn;
  }
}

export function leveledLogFn(err: Error, logger: P.Logger): LogFn {
  let _leveled: LogFn = logger.error;

  if (err instanceof LevelError) {
    _leveled = err.level(logger);
  }

  // https://github.com/pinojs/pino/issues/569#issuecomment-449363296
  return _leveled.bind(logger);
}

export class RetryableError extends LevelError {}

export class QuotaError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'QuotaError';
  }
}

export function wrapError(err: Error, msg: string): string {
  if (!isEmpty(err?.message)) {
    msg = `${msg}: ${err.message}`;
  }
  return msg;
}
