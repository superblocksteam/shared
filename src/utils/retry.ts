import { Tracer, Span, SpanOptions } from '@opentelemetry/api';
import P from 'pino';
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

export type RetryOptions<T> = {
  backoff: Backoff;
  logger: P.Logger;
  func: (_?: number) => Promise<T>;
  name?: string;
  doEvery?: () => void;
  doOnce?: () => void;
  tracer?: Tracer;
  spanOptions?: SpanOptions;
  spanName?: string;
};

export class Retry<T> {
  private _func: (_?: number) => Promise<T>;
  private _step: number;
  private _backoff: Backoff;
  private _logger: P.Logger;
  private _name: string;
  private _doEvery: () => void;
  private _doOnce: () => void;
  private _tracer: Tracer | undefined;
  private _spanOptions: SpanOptions;
  private _spanName: string;

  constructor(options: RetryOptions<T>) {
    this._func = options.func;
    this._step = 0;
    this._backoff = options.backoff;
    this._logger = options.logger;
    this._name = options.name ? options.name : 'unnamed';
    this._doEvery = options.doEvery || this.noOp;
    this._doOnce = options.doOnce || this.noOp;
    this._tracer = options.tracer;
    this._spanOptions = options.spanOptions || {};
    this._spanName = options.spanName || '';
  }

  private noOp(): void {
    return;
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
    if (this._tracer) {
      return this._tracer.startActiveSpan(this._spanName, this._spanOptions, async (span) => this._do(span));
    } else {
      return this._do();
    }
  }

  private async _do(span?: Span): Promise<T> {
    let i = 0;
    while (i++ < this._backoff.limit) {
      const logger = this._logger.child({ name: this._name, iteration: this._step + 1 });
      try {
        logger.info('executing function');
        return await this._func(i - 1);
      } catch (err) {
        logger.info({ err }, 'function execution failed');
        if (err instanceof RetryableError) {
          logger.debug('function IS retryable');

          this._doEvery();
          if (i === 1) {
            this._doOnce();
          }

          await this.wait();
          continue;
        }
        logger.debug('function IS NOT retryable');
        throw err;
      } finally {
        if (span) {
          span.end();
        }
      }
    }

    // The limit has been reached.
    throw new QuotaError(`This function has reached its limit of ${i} retries.`);
  }
}
