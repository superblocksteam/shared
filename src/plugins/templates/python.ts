import { EditorLanguage, FormComponentType, LanguagePluginID, Plugin, PluginResponseType, PluginType } from '../../types';

export const PythonPluginVersions = {
  V1: '0.0.1'
};

export const PythonPlugin: Plugin = {
  id: LanguagePluginID.Python,
  name: 'Python Function',
  moduleName: 'PythonPlugin',
  modulePath: 'plugins/python/PythonPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/python.png',
  type: PluginType.CODE,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Code',
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
            startVersion: PythonPluginVersions.V1,
            componentType: FormComponentType.CODE_EDITOR,
            language: EditorLanguage.PYTHON,
            initialValue: `# Use Python to:
#
# 1. Transform the output of previous Steps by referencing their output (ex. Step1.output)
# 2. Write logic referencing UI components (ex. Table1.selectedRow.id)
# 3. Make http calls using requests (import requests)
#
# More libraries are coming in the future. Superblocks uses Python 3.

return { "value": "Hello Superblocks!" }
`,
            rules: [{ required: true, message: 'Function body is required' }]
          }
        ]
      }
    ]
  }
};
