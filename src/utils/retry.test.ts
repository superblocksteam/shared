import { jest } from '@jest/globals';
import pino from 'pino';
import { RetryableError, QuotaError } from '../errors';
import { Retry, NoBackoff, NopFunc } from './retry';

describe('step', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });
  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('should correctly implement no backoff', () => {
    expect(new Retry({ backoff: NoBackoff, logger: pino(), func: NopFunc }).step()).toEqual(0);
  });

  it('should correctly implement exponential backoff (1/n)', () => {
    const retry = new Retry({
      backoff: {
        duration: 10,
        factor: 2,
        jitter: 0.5,
        limit: Infinity
      },
      logger: pino(),
      func: NopFunc
    });

    expect(retry.step()).toEqual(12.5);
    expect(retry.step()).toEqual(25);
    expect(retry.step()).toEqual(50);
    expect(retry.step()).toEqual(75);
    expect(retry.step()).toEqual(100);
    expect(retry.step()).toEqual(125);
  });

  it('should correctly implement exponential backoff (2/n)', () => {
    const retry = new Retry({
      backoff: {
        duration: 1000,
        factor: 2,
        jitter: 0.5,
        limit: Infinity
      },
      logger: pino(),
      func: NopFunc
    });

    expect(retry.step()).toEqual(1250);
    expect(retry.step()).toEqual(2500);
    expect(retry.step()).toEqual(5000);
    expect(retry.step()).toEqual(7500);
    expect(retry.step()).toEqual(10000);
    expect(retry.step()).toEqual(12500);
  });

  it('should correctly implement linear backoff', () => {
    const retry = new Retry({
      backoff: {
        duration: 10,
        factor: 1,
        jitter: 0.5,
        limit: Infinity
      },
      logger: pino(),
      func: NopFunc
    });

    expect(retry.step()).toEqual(12.5);
    expect(retry.step()).toEqual(12.5);
    expect(retry.step()).toEqual(12.5);
  });

  it('should correctly implement limit', async () => {
    const retry = new Retry({
      backoff: {
        duration: 10,
        factor: 1,
        jitter: 0.5,
        limit: 2
      },
      logger: pino(),
      func: async (): Promise<void> => {
        throw new RetryableError();
      }
    });

    await expect(retry.do()).rejects.toThrow(QuotaError);
  });
});
