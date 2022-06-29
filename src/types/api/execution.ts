import _ from 'lodash';
import { ApiNotificationConfiguration, Global } from '.';

// TODO(pbardea): Rename "view mode" everywhere to something more descriptive.
export const UNPUBLISHED_VIEW_MODE = false;
export const PUBLISHED_VIEW_MODE = true;

export interface ApiExecutionRequest {
  apiId: string;
  params: ExecutionParam[];
  viewMode: boolean;
  settings?: ApiExecutionSettings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies?: Record<string, any>;
}

export interface ApiExecutionSettings {
  timeout: number;
  memoryLimitMB: number;
}

export interface ApiExecutionResponse {
  apiId: string;
  apiName?: string;
  context: ExecutionContext;
  notificationConfig?: ApiNotificationConfiguration;
}

export class ExecutionContext {
  globals: { [key: string]: unknown };

  outputs: { [key: string]: ExecutionOutput };
  preparedStatementContext: unknown[];
  error?: string;
  errorContext?: {
    actionId: string;
    actionName: string;
  };

  constructor(context?: ExecutionContext) {
    this.globals = context && context.globals ? _.cloneDeep(context.globals) : {};
    this.outputs = context && context.outputs ? _.cloneDeep(context.outputs) : {};
    this.preparedStatementContext = context && context.preparedStatementContext ? _.cloneDeep(context.preparedStatementContext) : [];
  }

  addGlobalVariable(name: string, value: unknown): void {
    const obj = { [name]: value };
    this.globals = _.mergeWith(obj, this.globals, ExecutionContext.customMerger);
  }

  addGlobalsOverride(global: Global): void {
    for (const key of global.keys()) {
      this.addGlobalVariableOverride(key, global.get(key));
    }
  }

  addGlobalVariableOverride(name: string, value: unknown): void {
    const obj = { [name]: value };
    this.globals = _.mergeWith(this.globals, obj, ExecutionContext.customMerger);
  }

  addOutput(name: string, output: ExecutionOutput): void {
    this.outputs[name] = output;
  }

  merge(other: ExecutionContext): void {
    this.globals = {
      ...this.globals,
      ...other.globals
    };
    this.outputs = {
      ...this.outputs,
      ...other.outputs
    };
  }

  // Do not merge the objects in arrays. Just replace the entire array.
  private static customMerger(objValue, srcValue) {
    if (_.isArray(objValue)) {
      return srcValue;
    }
  }
}

export enum WorkflowExecutionParamsKey {
  QUERY_PARAMS = 'params',
  BODY = 'body'
}

export enum ApiReservedQueryParams {
  AUTH = 'sb-auth',
  ENVIRONMENT = 'environment',
  TEST = 'test'
}

export interface ExecutionParam {
  key: string;
  value: unknown;
}

export interface RedactableExecutionParam extends ExecutionParam {
  redactedValue?: string;
}

export type RawRequest = string | undefined;

export class ExecutionOutput {
  error?: string;
  children?: string[];
  startTimeUtc?: Date;
  executionTime: number;
  log: string[];
  output: unknown;
  request: RawRequest;

  constructor() {
    this.output = {};
    this.log = [];
  }

  static fromJSONString(json: string): ExecutionOutput {
    const obj = JSON.parse(json);
    const instance = new ExecutionOutput();
    instance.error = obj.error;
    instance.children = obj.children;
    instance.executionTime = obj.executionTime;
    instance.log = obj.log;
    instance.output = obj.output;
    instance.request = obj.request;
    instance.startTimeUtc = obj.startTimeUtc;

    return instance;
  }

  logInfo(msg: string): void {
    if (msg) {
      this.log.push(`${msg}`);
    }
  }

  logWarn(msg: string): void {
    if (msg) {
      this.log.push(`[WARN] ${msg}`);
    }
  }

  logError(msg: string): void {
    if (msg) {
      this.error = msg;
      this.log.push(`[ERROR] ${msg}`);
    }
  }
}
