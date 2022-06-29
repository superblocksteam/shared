export const truncatedJsonStringify = (obj: unknown, lengthLimit = 1000, tailLength = 10): string => {
  let stringified: string;
  try {
    stringified = JSON.stringify(obj);
  } catch (e) {
    // For very large objects, JSON.stringify may throw an error.
    return '<Truncated Large Object>';
  }
  if (stringified.length < lengthLimit) {
    return stringified;
  }
  return (
    stringified.substring(0, lengthLimit - tailLength) +
    '<… TRUNCATED …>' +
    stringified.substring(stringified.length - tailLength, stringified.length)
  );
};
