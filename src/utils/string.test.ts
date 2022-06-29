import { camelCaseToDisplay, validateEmail } from './string';

describe('camel case to display', () => {
  test('can convert camel case to display', () => {
    expect(camelCaseToDisplay('testCamelCase')).toBe('Test Camel Case');
  });
});

describe('validate email', () => {
  test('can validate email', () => {
    expect(validateEmail('somebody@domain.com')).toBe(true);
    expect(validateEmail('somebody+test@domain.com')).toBe(true);
    expect(validateEmail('some-body_123@domain.com')).toBe(true);
    expect(validateEmail('somebody@domain.another.com')).toBe(true);
    expect(validateEmail('somebody@place@domain.com')).toBe(false);
    expect(validateEmail('some<>body@domain.com')).toBe(false);
  });
});
