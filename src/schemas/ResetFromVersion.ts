export type ResetFromVersion = {
  // @type integer
  fromVersion: number;
  isDeployed?: boolean;
  description?: string; // expected to be provided when isDeployed is true
};
