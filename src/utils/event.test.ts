import { EnvEnum } from '../types';
import { EventSender, Logger } from './event';

const mockLogger: Logger = {
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn()
};

jest.mock('@rockset/client');
// https://jestjs.io/docs/mock-functions#mocking-modules
// A require is needed here in order to access the default export to override it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rockset = require('@rockset/client');
const mockRocksetInstance = {
  documents: {
    addDocuments: jest.fn()
  }
};
rockset.default.mockReturnValue(mockRocksetInstance);

describe('event sender', () => {
  test('can only configure known environments', () => {
    expect(() => {
      EventSender.configure('api-key', 'foo' as EnvEnum, 'test', mockLogger);
    }).toThrowError();
  });

  test('only logs at dev environments', () => {
    EventSender.configure('api-key', EnvEnum.DEV, 'test', mockLogger);
    EventSender.send({
      type: 'test',
      createdAt: new Date()
    });
    expect(mockLogger.debug).toBeCalled();
    expect(mockRocksetInstance.documents.addDocuments).not.toBeCalled();
  });

  test('only logs at prod environments', () => {
    EventSender.configure('api-key', EnvEnum.PROD, 'test', mockLogger);
    EventSender.send({
      type: 'test',
      createdAt: new Date()
    });
    expect(mockRocksetInstance.documents.addDocuments).toBeCalled();
  });
});
