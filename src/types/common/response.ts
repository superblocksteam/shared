import { Timing } from './timing';

export class ResponseWrapper<T> {
  responseMeta: ResponseMeta;
  data?: T;

  constructor({ data }: { data: T }) {
    this.responseMeta = new ResponseMeta({
      status: 200,
      message: '',
      success: true
    });
    this.data = data;
  }
}

export class ResponseMeta {
  status: number;
  message: string;
  success?: boolean;
  error?: ErrorDto;
  timing?: Timing;

  constructor({ status, message, success }: { status: number; message: string; success: boolean }) {
    this.status = status;
    this.message = message;
    this.success = success;
  }
}

export class ErrorDto {
  code: number;
  message: string;
  superblocksError?: SuperblocksError;
  constructor({ code, message, type }: { code: number; message: string; type?: SuperblocksError }) {
    this.code = code;
    this.message = message;
    this.superblocksError = type;
  }
}

// To let UI know if http error is caused by superblocks or external
export enum SuperblocksError {
  RbacUnauthorized = 'RbacUnauthorized'
}
