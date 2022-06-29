export const camelCaseToDisplay = (camelCaseString: string): string => {
  return (camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1)).replace(/([A-Z])/g, ' $1').trim();
};

export const jsonPrettyPrint = (obj: unknown): string => {
  return JSON.stringify(obj, null, 2);
};

export const EmailRegexString =
  '^(([^<>()[\\].,;:\\s@\\"]+(\\.[^<>()[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+[^<>()[\\]\\.,;:\\s@\\"]{2,})$';

const EmailRegex = new RegExp(EmailRegexString);
export const validateEmail = (email: string): boolean => {
  return EmailRegex.test(email);
};
