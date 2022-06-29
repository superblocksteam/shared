export class RetryableError extends Error {}

export class QuotaError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'QuotaError';
  }
}
