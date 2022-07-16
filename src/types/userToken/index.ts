import { AuthConfig, AuthType, TokenType } from '..';

export type PostUserTokenRequestDto = {
  authConfig?: AuthConfig;
  authType?: AuthType;
  datasourceId?: string;
  expiresAt?: Date;
  tokenType?: TokenType;
  tokenValue: string;
};
