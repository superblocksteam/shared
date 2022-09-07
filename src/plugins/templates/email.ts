import { FormComponentType, FormItem, Plugin, PluginResponseType, PluginType } from '../../types';

// superblocksmail is set up as a verified domain in Sendgrid under a different account than superblockshq.com.
// The current setup allows us to use any address with that domain.
export const EMAIL_INTEGRATION_SENDER_ADDRESS_DEFAULT = 'app@superblocksmail.com';
export const EMAIL_INTEGRATION_SENDER_NAME_DEFAULT = 'Superblocks';

export const EmailPluginVersions = {
  V1: '0.0.1'
};

export enum EmailActionFieldNames {
  FROM = 'emailFrom',
  TO = 'emailTo',
  CC = 'emailCc',
  BCC = 'emailBcc',
  SUBJECT = 'emailSubject',
  BODY = 'emailBody',
  ATTACHMENTS = 'emailAttachments'
}

export const EmailActionFieldsMap: Record<EmailActionFieldNames, FormItem> = {
  [EmailActionFieldNames.FROM]: {
    name: EmailActionFieldNames.FROM,
    label: 'From',
    startVersion: EmailPluginVersions.V1,
    // Using the defaults directly since we will have to refactor this plugin when we allow
    // user specified API key and/or sender through delegation.
    initialValue: `${EMAIL_INTEGRATION_SENDER_NAME_DEFAULT} <${EMAIL_INTEGRATION_SENDER_ADDRESS_DEFAULT}>`,
    componentType: FormComponentType.INPUT_TEXT,
    disabled: true
  },
  [EmailActionFieldNames.TO]: {
    name: EmailActionFieldNames.TO,
    label: 'To',
    startVersion: EmailPluginVersions.V1,
    componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
    placeholder: 'jane@acme.com, rahul@acme.com',
    rules: [{ required: true, message: 'To is required' }]
  },
  [EmailActionFieldNames.CC]: {
    name: EmailActionFieldNames.CC,
    label: 'Cc',
    startVersion: EmailPluginVersions.V1,
    componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
    placeholder: 'emilia@acme.com, jose@acme.com'
  },
  [EmailActionFieldNames.BCC]: {
    name: EmailActionFieldNames.BCC,
    label: 'Bcc',
    startVersion: EmailPluginVersions.V1,
    componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
    placeholder: 'huang@acme.com, sofia@acme.com'
  },
  [EmailActionFieldNames.SUBJECT]: {
    name: EmailActionFieldNames.SUBJECT,
    label: 'Subject',
    startVersion: EmailPluginVersions.V1,
    componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
    placeholder: 'Daily Usage Report',
    rules: [{ required: true, message: 'Subject is required' }]
  },
  [EmailActionFieldNames.BODY]: {
    name: EmailActionFieldNames.BODY,
    label: 'Body',
    startVersion: EmailPluginVersions.V1,
    componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
    placeholder: `Supports both plain text and html. For example:
<h3 style="color:Tomato;">There were a total of {{Step1.output.count}} API calls made today.</h3>`,
    style: {
      minHeight: '100px'
    }
  },
  [EmailActionFieldNames.ATTACHMENTS]: {
    name: EmailActionFieldNames.ATTACHMENTS,
    label: 'File Attachments Object Array',
    startVersion: EmailPluginVersions.V1,
    componentType: FormComponentType.DYNAMIC_INPUT_TEXT,
    placeholder: `Specify email attachments as an array of Superblocks file entities in one of the following ways:

1. Use uploaded files directly:
{{FilePicker1.files}}

2. Specify files programmatically:
{{[ { name: "test.csv", contents: Step1.output, type: "text/csv" },
FilePicker1.files[0] ]}}
    `,
    style: {
      minHeight: '100px'
    }
  }
};

export const EmailPlugin: Plugin = {
  id: 'email',
  name: 'Email',
  moduleName: 'EmailPlugin',
  modulePath: 'plugins/email/EmailPlugin',
  iconLocation: 'https://superblocks.s3-us-west-2.amazonaws.com/img/integrations/email.png',
  type: PluginType.API,
  responseType: PluginResponseType.JSON,
  hasRawRequest: true,
  rawRequestName: 'Executed Request',
  // TODO: Enable this when we make the Email integration user configurable
  // datasourceTemplate: {
  //   sections: [
  //     {
  //       name: 'main',
  //       items: [
  //         {
  //           label: 'API Key',
  //           name: 'authentication.custom.apiKey.value',
  //           componentType: FormComponentType.INPUT_TEXT,
  //           rules: [{ required: true, message: 'API Key is required' }]
  //         },
  //         {
  //           label: 'Sender address',
  //           name: 'authentication.custom.senderEmail.value',
  //           componentType: FormComponentType.INPUT_TEXT,
  //           rules: [{ required: true, message: 'Sender Address is required' }]
  //         },
  //         {
  //           label: 'Sender name',
  //           name: 'authentication.custom.senderName.value',
  //           componentType: FormComponentType.INPUT_TEXT,
  //           rules: [{ required: true, message: 'Sender Name is required' }]
  //         }
  //       ]
  //     }
  //   ]
  // },
  actionTemplate: {
    sections: [
      {
        name: 'main',
        items: Object.values(EmailActionFieldsMap)
      }
    ]
  }
};
