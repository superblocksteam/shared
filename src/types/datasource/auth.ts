import JSON5 from 'json5';
import { isEmpty } from 'lodash';
import { RedactableExecutionParam } from '../api/execution';
import { Property } from '../common/property';

export const OAUTH_CALLBACK_PATH = 'oauth/callback';

export type AuthId = string;

// getAuthId returns the key that is used to identify which token should be used
// for a specific auth type.
// A suffix may be appended for each value that we're caching (eg "-token",
// "-refresh", etc)
export function getAuthId(authType: AuthType | undefined, authConfig: AuthConfig | undefined, datasourceId?: string): AuthId {
  return `${authType}.${getClientId(authType, authConfig, datasourceId)}`;
}

export function getClientId(authType: AuthType | undefined, config: AuthConfig | undefined, datasourceId?: string): string {
  const unknownClient = 'unknown-client';
  if (!authType || !config) {
    return unknownClient;
  }

  const clientIdForAuthType = (): string | undefined => {
    switch (authType) {
      case RestApiIntegrationAuthType.BASIC:
        return datasourceId ?? '';
      case RestApiIntegrationAuthType.FIREBASE: {
        const firebaseConfig = config as FirebaseAuthConfig;
        if (!firebaseConfig.apiKey) {
          return undefined;
        }
        try {
          const parsed = JSON5.parse(firebaseConfig.apiKey);
          return parsed.projectId;
        } catch (err) {
          return undefined;
        }
      }
      case RestApiIntegrationAuthType.OAUTH2_PASSWORD: {
        return (config as OAuthConfig).clientId;
      }
      case RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS:
      case RestApiIntegrationAuthType.OAUTH2_CODE:
      case RestApiIntegrationAuthType.OAUTH2_IMPLICIT:
      case GoogleSheetsAuthType.OAUTH2_CODE: {
        let apiId = config.clientId ?? datasourceId;
        const oauthConfig = config as OAuthConfig;
        // in case there are muliple scopes, separated by a whitespace - sort them before hashing
        const scopeHash = 'scope' in oauthConfig ? insecureHash(oauthConfig.scope?.split(' ').sort().join(' ')) : null;
        if (!scopeHash || !isEmpty(scopeHash)) {
          // OAuth scopes are optional according to the OAuth spec.
          apiId += `-${scopeHash}`;
        }
        return apiId;
      }
      default:
        return undefined;
    }
  };

  return clientIdForAuthType() ?? unknownClient;
}

// This enum is persisted and used in UI <> agent communication, so take care
// when modifying existing values.
export enum RestApiIntegrationAuthType {
  NONE = 'None',
  BASIC = 'basic',
  OAUTH2_CODE = 'oauth-code',
  OAUTH2_CLIENT_CREDS = 'oauth-client-cred',
  OAUTH2_IMPLICIT = 'oauth-implicit',
  OAUTH2_PASSWORD = 'oauth-pword',
  FIREBASE = 'Firebase'
}

export enum GoogleSheetsAuthType {
  // this is used in GoogleSheetsPlugin.preCreateValidate
  OAUTH2_CODE = 'oauth-code',
  SERVICE_ACCOUNT = 'service-account'
}

export enum AWSAuthType {
  ACCESS_KEY = 'access-key',
  TOKEN_FILE = 'token-file',
  EC2_INSTANCE_METADATA = 'ec2-instance-metadata'
}

export const awsAuthTypeDisplayName = new Map([
  [AWSAuthType.ACCESS_KEY, 'Access Key'],
  [AWSAuthType.TOKEN_FILE, 'Token File'],
  [AWSAuthType.EC2_INSTANCE_METADATA, 'EC2 Instance Metadata']
]);

export function getAWSAuthTypeDisplayName(authType: AWSAuthType): string {
  return awsAuthTypeDisplayName.get(authType) ?? '';
}

export type AuthType = RestApiIntegrationAuthType | GoogleSheetsAuthType;

export function getDisplayName(authType: AuthType): string {
  switch (authType) {
    case RestApiIntegrationAuthType.BASIC:
      return 'Basic Authentication';
    case RestApiIntegrationAuthType.FIREBASE:
      return 'Firebase';
    case RestApiIntegrationAuthType.OAUTH2_PASSWORD:
      // APIs should be migrating away from this grant type. Add legacy to hint
      // to users this is probably not the grant type they want.
      return 'OAuth2 - Password Grant (Legacy)';
    case RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS:
      return 'OAuth2 - Client Credentials Grant';
    case RestApiIntegrationAuthType.OAUTH2_IMPLICIT:
      return 'OAuth2 - Implicit Grant';
    case RestApiIntegrationAuthType.OAUTH2_CODE:
      return 'OAuth2 - Authentication Code';
    case RestApiIntegrationAuthType.NONE:
    default:
      return 'None';
  }
}

export type PublicFirebaseAuthConfig = {
  apiKey?: string;
  google?: boolean;
  email?: boolean;
};

export type FirebaseAuthConfig = PublicFirebaseAuthConfig;

export type PublicOAuthConfig = PublicOAuthPasswordConfig &
  PublicOAuthClientCredsConfig &
  PublicOAuthImplicitConfig &
  PublicOAuthCodeConfig;
export type OAuthConfig = OAuthPasswordConfig & OAuthClientCredsConfig & OAuthImplicitConfig & OAuthCodeConfig;

type PublicOAuthPasswordConfig = {
  clientId?: string;
  tokenUrl?: string;
  useFixedPasswordCreds?: boolean;
};

export type OAuthPasswordConfig = PublicOAuthPasswordConfig & {
  clientSecret?: string;
  // A fixed username and password can be optionally provided.
  username?: string;
  password?: string;
};

type PublicOAuthClientCredsConfig = {
  clientId?: string;
  tokenUrl?: string;
  scope?: string;
};

export type OAuthClientCredsConfig = PublicOAuthClientCredsConfig & {
  clientSecret?: string;
};

type PublicOAuthImplicitConfig = {
  clientId?: string;
  authorizationUrl?: string;
  scope?: string;
};

export type OAuthImplicitConfig = PublicOAuthImplicitConfig & {
  clientSecret?: string;
};

type PublicOAuthCodeConfig = {
  clientId?: string;
  authorizationUrl?: string;
  tokenUrl?: string;
  scope?: string;
  refreshTokenFromServer?: boolean;
  hasToken?: boolean;
  tokenScope?: TokenScope;
  authToken?: string;
  userEmail?: string;
};

export type OAuthCodeConfig = PublicOAuthCodeConfig & {
  clientSecret?: string;
};

export enum TokenScope {
  DATASOURCE = 'datasource',
  USER = 'user'
}

export enum TokenType {
  REFRESH = 'refresh',
  USER = 'userId',
  // Access token is persisted as "token" for backwards compatibility.
  ACCESS = 'token'
}

export function userAccessibleTokens(): TokenType[] {
  return [TokenType.USER, TokenType.ACCESS];
}

type FakeBoolean = boolean | string;

export type BasicAuthConfig = PublicBasicAuthConfig & {
  username?: string;
  password?: string;
};

export type PublicBasicAuthConfig = {
  shareBasicAuthCreds?: FakeBoolean;
};

export const extractPublic = (authType: AuthType, authConfig: AuthConfig): PublicAuthConfig => {
  switch (authType) {
    case RestApiIntegrationAuthType.BASIC:
      return {
        shareBasicAuthCreds: authConfig.shareBasicAuthCreds
      };
    case RestApiIntegrationAuthType.OAUTH2_CLIENT_CREDS:
      return {
        clientId: authConfig.clientId,
        tokenUrl: authConfig.tokenUrl,
        scope: authConfig.scope
      };
    case RestApiIntegrationAuthType.OAUTH2_CODE:
      return {
        clientId: authConfig.clientId,
        authorizationUrl: authConfig.authorizationUrl,
        tokenUrl: authConfig.tokenUrl,
        scope: authConfig.scope,
        refreshTokenFromServer: authConfig.refreshTokenFromServer,
        hasToken: authConfig.hasToken,
        tokenScope: authConfig.tokenScope
      };
    case RestApiIntegrationAuthType.OAUTH2_IMPLICIT:
      return {
        clientId: authConfig.clientId,
        authorizationUrl: authConfig.authorizationUrl,
        scope: authConfig.scope
      };
    case RestApiIntegrationAuthType.OAUTH2_PASSWORD:
      return {
        clientId: authConfig.clientId,
        tokenUrl: authConfig.tokenUrl,
        useFixedPasswordCreds: authConfig.useFixedPasswordCreds
      };
    case RestApiIntegrationAuthType.FIREBASE:
      return authConfig;
    case RestApiIntegrationAuthType.NONE:
      return authConfig;
    case GoogleSheetsAuthType.OAUTH2_CODE:
      return {};
    case GoogleSheetsAuthType.SERVICE_ACCOUNT:
      return {};
    default:
      throw new Error(`unknown auth type: ${authType}`);
  }
};

type ServiceAccountConfig = {
  googleServiceAccount?: Property;
};

type PublicRestAuthConfig = PublicBasicAuthConfig & PublicOAuthConfig & PublicFirebaseAuthConfig;
type PublicGoogleSheetsAuthConfig = PublicOAuthCodeConfig;
export type PublicAuthConfig = PublicRestAuthConfig & PublicGoogleSheetsAuthConfig;

export type RestAuthConfig = BasicAuthConfig & OAuthConfig & FirebaseAuthConfig;
export type GoogleSheetsAuthConfig = OAuthCodeConfig & ServiceAccountConfig;
export type AuthConfig = RestAuthConfig & GoogleSheetsAuthConfig;

// TODO: this lives here for now to avoid a cyclic dependency. The utils
// directory transitively depends on this file.
// An insecure hash function used to condense a string.
const insecureHash = (s: string | undefined): string => {
  // We need the redundant `!s` check to satisfy the type checker that s is not
  // undefined.
  if (!s || isEmpty(s)) {
    return '';
  }
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    // Convert to 32 bits.
    hash = hash & hash;
  }
  return hash.toString();
};

export type AuthContext = Record<AuthId, RedactableExecutionParam[]>;

export type ExchangeCodeResponse = {
  successful: boolean;
  error?: string;
};

export type DatasourceAuthState = {
  //TODO: add a unique token to prefent CSRF attack
  name: () => string;
  datasourceId: string;
  organizationId: string;
  pluginId: string;
  userEmail: string;
  origin: string;
  requestedScope: () => string;
};

export type DeleteDatasourceOnAgentResult = {
  message?: string;
  success: boolean;
};
