import { Plugin, PluginResponseType, PluginType } from '../../types';

export const WorkflowPluginVersions = {
  V1: '0.0.1'
};

export const WorkflowPlugin: Plugin = {
  id: 'workflow',
  name: 'Workflow',
  moduleName: 'WorkflowPlugin',
  modulePath: 'plugins/superblocks/workflow/WorkflowPlugin',
  iconLocation: 'https://superblocks.s3.us-west-2.amazonaws.com/logo.png',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: false,
  datasourceTemplate: {
    sections: []
  },
  actionTemplate: {
    sections: [
      /* Dynamically filled out by resolverContext */
    ]
  }
};
