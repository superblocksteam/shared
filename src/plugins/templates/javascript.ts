import { EditorLanguage, FormComponentType, LanguagePluginID, Plugin, PluginResponseType, PluginType } from '../../types';

export const JavascriptPluginVersions = {
  V1: '0.0.1'
};

export const JavascriptPlugin: Plugin = {
  id: LanguagePluginID.Javascript,
  name: 'Javascript Function',
  moduleName: 'JavascriptPlugin',
  modulePath: 'plugins/javascript/JavascriptPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/javascript.png',
  type: PluginType.CODE,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Code',
  agentVersion: '0.0.1',
  datasourceTemplate: {
    sections: []
  },
  actionTemplate: {
    sections: [
      {
        name: 'main',
        items: [
          {
            name: 'body',
            label: '',
            startVersion: JavascriptPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.JAVASCRIPT,
            initialValue: `/*
 * You can use Javascript Functions to:
 *   1. Transform the output of previous Steps by referencing their output (ex. Step1.output)
 *   2. Write business logic referencing UI components (ex. Table1.selectedRow.id)
 *   3. Make http calls via axios
 *
 * Moment.js (moment), lodash.js (_), axios, aws-sdk, base64url, jsonwebtoken, and xmlbuilder2 libraries are currently supported.
 */

const obj = {str: "hello world"};
console.log(obj.str);
return obj;
`,
            rules: [{ required: true, message: 'Function body is required' }]
          }
        ]
      }
    ]
  }
};
