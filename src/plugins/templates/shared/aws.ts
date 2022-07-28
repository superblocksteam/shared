import { AgentType, AWSAuthType, FormComponentType, FormSection, getAWSAuthTypeDisplayName, InputDataType } from '../../../types';

export const getAWSAuthSection = (config: { startVersion: string }): FormSection => {
  return {
    name: 'auth',
    borderThreshold: 1,
    items: [
      {
        label: 'Auth Type',
        name: 'awsAuthType',
        startVersion: config.startVersion,
        componentType: FormComponentType.DROPDOWN,
        initialValue: AWSAuthType.ACCESS_KEY,
        options: Object.values(AWSAuthType).map((authType) => ({
          displayName: getAWSAuthTypeDisplayName(authType),
          value: authType,
          key: authType
        })),
        agentType: AgentType.ONPREMISE
      },
      {
        label: 'Region',
        name: 'authentication.custom.region.value',
        startVersion: config.startVersion,
        componentType: FormComponentType.INPUT_TEXT,
        display: {
          show: {
            awsAuthType: [AWSAuthType.ACCESS_KEY]
          }
        },
        agentType: AgentType.ONPREMISE
      },
      {
        label: 'Access Key ID',
        name: 'authentication.custom.accessKeyID.value',
        startVersion: config.startVersion,
        componentType: FormComponentType.INPUT_TEXT,
        display: {
          show: {
            awsAuthType: [AWSAuthType.ACCESS_KEY]
          }
        },
        agentType: AgentType.ONPREMISE
      },
      {
        label: 'Secret Key',
        name: 'authentication.custom.secretKey.value',
        startVersion: config.startVersion,
        componentType: FormComponentType.INPUT_TEXT,
        dataType: InputDataType.PASSWORD,
        display: {
          show: {
            awsAuthType: [AWSAuthType.ACCESS_KEY]
          }
        },
        agentType: AgentType.ONPREMISE
      },
      {
        label: '',
        text: `This option allows you to use [Service Account Token Volume Projection](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) to authorize your On-Premise Agent to connect to your S3 Buckets.`,
        name: 'TokenFileAlert',
        startVersion: config.startVersion,
        componentType: FormComponentType.ALERT,
        agentType: AgentType.ONPREMISE,
        display: {
          show: {
            awsAuthType: [AWSAuthType.TOKEN_FILE]
          }
        }
      },
      {
        label: '',
        text: `This option allows you to use [EC2 Instance Metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html) to authorize your On-Premise Agent to connect to your S3 Buckets. If you are using [Kube2Iam](https://github.com/jtblin/kube2iam), you would select this option.`,
        name: 'EC2InstanceMetadataAlert',
        startVersion: config.startVersion,
        componentType: FormComponentType.ALERT,
        agentType: AgentType.ONPREMISE,
        display: {
          show: {
            awsAuthType: [AWSAuthType.EC2_INSTANCE_METADATA]
          }
        }
      }
    ]
  };
};
