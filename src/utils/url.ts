import { isEmpty } from 'lodash';
import { Property } from '..';
import { RestApiBodyDataType } from '../types';

// makeCurlString is a best effort attempt to make a formatted curl request.
export const makeCurlString = ({
  reqMethod,
  reqUrl,
  reqHeaders,
  reqParams,
  reqBody,
  reqFormData,
  reqBodyType,
  reqFileName,
  reqFileFormKey
}: {
  reqMethod?: string;
  reqUrl?: string;
  reqHeaders?: Property[];
  reqParams?: Property[];
  reqBody?: string;
  reqFormData?: Property[];
  reqBodyType?: RestApiBodyDataType;
  reqFileName?: string;
  reqFileFormKey?: string;
}): string => {
  if (!reqUrl) {
    throw new Error('No URL specified');
  }
  let url: URL;
  try {
    url = new URL(reqUrl ?? '');
  } catch (e) {
    throw new Error(`Could not parse URL ${reqUrl}: ${e}`);
  }

  let headers = {};
  try {
    const headerList = reqHeaders;
    if (headerList) {
      headers = headerList.reduce<Record<string, unknown>>((o: Record<string, unknown>, p: Property) => {
        if (!p) return o;
        if (!Object.prototype.hasOwnProperty.call(o, p?.key) && p?.key && p?.key !== '') {
          o[p.key] = p.value;
        }
        return o;
      }, {});
    }
  } catch (err) {
    headers['ERROR: Headers failed to transform'] = err.message;
  }

  if (reqParams) {
    reqParams.filter(paramHasKeyValue).forEach((param, i) => {
      url.searchParams.append(param.key, param.value);
    });
  }

  const lineConnector = ' \\\n'; // connects the headers to the optional data-raw fields.
  const curlHeaders = Object.keys(headers)
    .filter((key) => !isEmpty(key))
    .map((key) => `\t--header '${key}: ${headers[key]}'`)
    .join(lineConnector);

  let curlRequest = `curl --location --request ${reqMethod ?? 'NONE'} '${url.toString()}'`;
  if (curlHeaders) {
    curlRequest += lineConnector;
    curlRequest += curlHeaders;
  }

  switch (reqBodyType) {
    case RestApiBodyDataType.JSON: {
      if (!isEmpty(reqBody)) {
        let body;
        try {
          body = JSON.stringify(JSON.parse(reqBody as string), null, 4);
        } catch (err) {
          body = reqBody;
        }
        curlRequest += lineConnector;
        curlRequest += `\t--data-raw '${body}'`;
      }
      break;
    }
    case RestApiBodyDataType.RAW: {
      if (!isEmpty(reqBody)) {
        curlRequest += lineConnector;
        curlRequest += `\t--data-raw '${reqBody}'`;
      }
      break;
    }
    case RestApiBodyDataType.FORM: {
      if (!isEmpty(reqFormData)) {
        for (const property of reqFormData as Property[]) {
          curlRequest += lineConnector;
          curlRequest += `\t--form '${property.key}="${property.value || ''}"'`;
        }
      }
      break;
    }
    case RestApiBodyDataType.FILE_FORM: {
      if (!isEmpty(reqFileName) && !isEmpty(reqFileFormKey)) {
        curlRequest += lineConnector;
        curlRequest += `\t--form '${reqFileFormKey}="@${reqFileName}"'`;
      }
      break;
    }
  }

  return curlRequest;
};

export const paramHasKeyValue = (param: Property | undefined): param is Property & { key: string; value: string } => {
  return !isEmpty(param?.key) && param?.value !== undefined;
};

//match url pattern
export const isApplicationUrl = (url: string): boolean => {
  const re = /\/applications\/.*?$/;
  return re.test(url);
};

export const isApplicationEditUrl = (url: string): boolean => {
  const re = /\/applications\/.*\/edit.*?$/;
  return re.test(url);
};

export const isWorkflowUrl = (url: string): boolean => {
  const re = /\/workflows\/.*?$/;
  return re.test(url);
};

export const isScheduledJobUrl = (url: string): boolean => {
  const re = /\/scheduled_jobs\/.*?$/;
  return re.test(url);
};

export const getApplicationIdFromUrl = (url: string): string | undefined => {
  const re = /\/applications\/(.*?)\//;
  const matched = url.match(re);
  if (matched) {
    return matched[1];
  }
};

export const getWorkflowIdFromUrl = (url: string): string | undefined => {
  const re = /\/workflows\/(.*?)\//;
  const matched = url.match(re);
  if (matched) {
    return matched[1];
  }
};

export const getScheduledJobIdFromUrl = (url: string): string | undefined => {
  const re = /\/scheduled_jobs\/(.*?)\//;
  const matched = url.match(re);
  if (matched) {
    return matched[1];
  }
};

export const appendParam = (url: string, name: string, value: string): string => {
  if (url.indexOf('?') === -1) {
    return `${url}?${name}=${value}`;
  }
  return `${url}&${name}=${value}`;
};

export const appendParams = (url: string, params: Record<string, string>): string => {
  let finalUrl = url;
  Object.entries(params).forEach(([key, value]) => {
    finalUrl = appendParam(finalUrl, key, value);
  });
  return finalUrl;
};

export const extractParamsWithPrefix = (params: Record<string, string>, prefix: string): Record<string, string> => {
  const paramsWithPrefix = {};
  Object.entries(params).forEach(([key, value]) => {
    if (key.startsWith(prefix)) {
      paramsWithPrefix[key] = value;
    }
  });
  return paramsWithPrefix;
};
