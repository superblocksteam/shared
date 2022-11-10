import { Billing } from '../billing';
import { GroupBrief } from '../group';
import { PluginExecutionVersions } from '../plugin';
import { Agent, AgentType } from './agent';

export const SUPERBLOCKS_ORG_NAME = 'superblockshq.com';
export const SUPERBLOCKS_TEST_ORG_NAME = 'superblocksservertest.com';

export const VISITOR_ORG_NAME = 'visitor';

export interface Organization {
  id: string;
  name: string;
  displayName: string;
  agents: Agent[];
  apiKey: string;
  agentType: AgentType;
  minExternalAgentVersion: string;
  pluginExecutionVersions?: PluginExecutionVersions;
  groups: GroupBrief[];
  billing: Billing;
}

export type OrgBriefDto = {
  id: string;
  name: string;
};

export * from './agent';
export * from './invite';
