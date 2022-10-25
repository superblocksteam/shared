import { isEmpty } from 'lodash';
import { SemVer } from '../plugin';

export enum AgentType {
  MULTITENANT = 0,
  DEDICATED = 1,
  ONPREMISE = 2
}

// This function returns a descriptive name for each known agent type
export const getAgentTypeName = (agentType: AgentType): string => {
  switch (agentType) {
    case AgentType.DEDICATED:
    case AgentType.MULTITENANT:
      return 'Cloud';
    case AgentType.ONPREMISE:
      return 'On-premise';
  }
};

export enum AgentStatus {
  ACTIVE = 'Active',
  DISCONNECTED = 'Disconnected',
  BROWSER_UNREACHABLE = 'Browser Unreachable',
  // TODO: remove PENDING_REGISTRATION after the DB migration
  PENDING_REGISTRATION = 'Pending Registration',
  STALE = 'Stale'
}

export type Agents = Record<string, Agent>;

export type Agent = {
  id: string;
  key: string;
  environment: string;
  status: AgentStatus;
  version: string;
  versionExternal: string;
  supportedPluginVersions: Record<string, SemVer[]>;
  url: string;
  type: AgentType;
  updated: Date;
  created: Date;
};

export type AgentKey = {
  key: string;
};

export const compareSemVer = (version1: SemVer, version2: SemVer): number => {
  if (isEmpty(version1) || typeof version1 !== 'string') {
    throw new Error(`Invalid semver ${version1}.`);
  }

  if (isEmpty(version2) || typeof version2 !== 'string') {
    throw new Error(`Invalid semver ${version2}.`);
  }

  const [major1, minor1, patch1] = parseSemVer(version1);
  const [major2, minor2, patch2] = parseSemVer(version2);

  const invalidVersion1 = Number.isNaN(major1) || Number.isNaN(minor1) || Number.isNaN(patch1);
  const invalidVersion2 = Number.isNaN(major2) || Number.isNaN(minor2) || Number.isNaN(patch2);

  if (invalidVersion1) {
    throw new Error(`Invalid semver version ${version1}`);
  }

  if (invalidVersion2) {
    throw new Error(`Invalid semver version ${version2}`);
  }

  return compareParsedSemVer(
    {
      major: major1,
      minor: minor1,
      patch: patch1
    },
    {
      major: major2,
      minor: minor2,
      patch: patch2
    }
  );
};

/**
 * Return a negative number if version1 is earlier than version2;
 * positive if the version1 is older than version2;
 * 0 if they are equivalent.
 *
 * If the versions are both invalid, return 0.
 * Otherwise, either invalid version is treated as greater than the other one.
 */
export const compareAgentExternalVersions = (version1: string, version2: string): number => {
  if ((isEmpty(version1) || typeof version1 !== 'string') && (isEmpty(version2) || typeof version2 !== 'string')) {
    return 0;
  }

  if (isEmpty(version1) || typeof version1 !== 'string') {
    return 1;
  }

  if (isEmpty(version2) || typeof version2 !== 'string') {
    return -1;
  }

  // External version has a leading 'v'
  const [major1, minor1, patch1] = parseSemVer(version1.substring(1));
  const [major2, minor2, patch2] = parseSemVer(version2.substring(1));

  const invalidVersion1 = Number.isNaN(major1) || Number.isNaN(minor1) || Number.isNaN(patch1);
  const invalidVersion2 = Number.isNaN(major2) || Number.isNaN(minor2) || Number.isNaN(patch2);

  if (invalidVersion1 && invalidVersion2) {
    return 0;
  }

  if (invalidVersion1) {
    return 1;
  }

  if (invalidVersion2) {
    return -1;
  }

  return compareParsedSemVer(
    {
      major: major1,
      minor: minor1,
      patch: patch1
    },
    {
      major: major2,
      minor: minor2,
      patch: patch2
    }
  );
};

const parseSemVer = (semVer: SemVer) => {
  return semVer.split('.').map((v) => Number.parseInt(v));
};

type parsedSemVer = { major: number; minor: number; patch: number };

const compareParsedSemVer = (version1: parsedSemVer, version2: parsedSemVer) => {
  if (version1.major > version2.major) {
    return 1;
  }

  if (version2.major > version1.major) {
    return -1;
  }

  if (version1.minor > version2.minor) {
    return 1;
  }

  if (version2.minor > version1.minor) {
    return -1;
  }

  if (version1.patch > version2.patch) {
    return 1;
  }

  if (version2.patch > version1.patch) {
    return -1;
  }

  return 0;
};
