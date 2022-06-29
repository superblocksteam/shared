import rockset, { MainApi as RocksetClient } from '@rockset/client';
import { UserEvent } from '../types';
import { EnvEnum } from '../types/common/env';

export enum Collections {
  USER_EVENT = 'user-events'
}

// General logger function interface
interface LogFn {
  /* tslint:disable:no-unnecessary-generics */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends Record<string, unknown>>(obj: T, ...args: any[]): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (msg: string, ...args: any[]): void;
}

// General logger interface that could be either superblocks/ui logger or superlbocks/server logger
export interface Logger {
  error: LogFn;
  warn: LogFn;
  info: LogFn;
  debug: LogFn;
}

export class EventSender {
  private static _instance: EventSender;

  rocksetClient: RocksetClient;
  workspace: string;
  collection: string;
  env: string;
  logger: Logger;

  private constructor(apiKey: string, env: EnvEnum, collection: string, logger: Logger) {
    // Staging and dev share a rockset workspace
    if (env === EnvEnum.DEV || env === EnvEnum.STAGING || env === EnvEnum.DEMO) {
      this.workspace = 'staging';
    } else if (env === EnvEnum.PROD) {
      this.workspace = 'prod';
    } else {
      throw Error(`Unknown environment: ${env}`);
    }

    this.rocksetClient = rockset(apiKey);
    this.collection = collection;
    this.env = env;
    this.logger = logger;
  }

  public static configure(apiKey: string, env: EnvEnum, collection: string, logger: Logger): void {
    this._instance = new this(apiKey, env, collection, logger);
  }

  // TODO retry and batching will be implemented here
  public static async send(event: UserEvent): Promise<void> {
    if (!this._instance) {
      throw Error('RocksetClient not initialized');
    }

    try {
      if (this._instance.env === EnvEnum.DEV) {
        this._instance.logger.debug(`EventSender event: ${JSON.stringify(event)}`);
        return;
      }

      await this._instance.rocksetClient.documents.addDocuments(this._instance.workspace, this._instance.collection, {
        data: [event]
      });
    } catch (err) {
      this._instance.logger.error(`EventSender failed to send to Rockset: ${err}`);
    }
  }
}
