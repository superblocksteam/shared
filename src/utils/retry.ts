import { P } from 'pino';
import { RetryableError, QuotaError } from '../errors';

export const NoBackoff: Backoff = {
  duration: 0,
  factor: 0,
  jitter: 0,
  limit: Infinity
};

export type Backoff = {
  duration: number;
  factor: number;
  jitter: number;
  limit: number;
};

export const NopFunc = (): Promise<string> => {
  return new Promise((resolve) => resolve('nop'));
};

export class Retry<T> {
  private _func: () => Promise<T>;
  private _step: number;
  private _backoff: Backoff;
  private _logger: P.Logger;
  private _name: string;

  constructor(backoff: Backoff, logger: P.Logger, func: () => Promise<T>, name?: string) {
    this._func = func;
    this._step = 0;
    this._backoff = backoff;
    this._logger = logger;
    this._name = name ? name : 'unnamed';
  }

  public step(): number {
    this._step++;

    // TOOD(frank): validation
    const { duration: d, factor: f, jitter: j } = this._backoff;

    const min = f > 1 && this._step > 1 ? f * d * (this._step - 1) : d;
    const max = min + min * j;

    return Math.random() * (max - min) + min;
  }

  public async wait(): Promise<void> {
    const duration = this.step();
    if (duration != 0) {
      return new Promise((resolve) => setTimeout(resolve, duration));
    }
  }

  public async do(): Promise<T> {
    let i = 0;

    while (i++ < this._backoff.limit) {
      const logger = this._logger.child({ name: this._name, iteration: this._step + 1 });
      try {
        logger.info('executing function');
        return await this._func();
      } catch (err) {
        logger.info({ err }, 'function execution failed');
        if (err instanceof RetryableError) {
          logger.debug('function IS retryable');
          await this.wait();
          continue;
        }
        logger.debug('function IS NOT retryable');
        throw err;
      }
    }

    // The limit has been reached.
    throw new QuotaError(`This function has reached its limit of ${i} retries.`);
  }
}
