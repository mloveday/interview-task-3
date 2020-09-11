import {credentials, Credentials, resetCredentials, setCredentials} from "./CredentialsState";

jest.mock('../Service/Fetch')

describe('CredentialsState', () => {
  describe('setCredentials', () => {

    test('returns expected action with id & secret in payload', () => {
      const expectedId = 'expected-id';
      const expectedSecret = 'expected-secret';

      const result = setCredentials(expectedId, expectedSecret);

      expect(result.type).toEqual('CREDENTIALS__SET');
      expect(result.payload).toEqual({id: expectedId, secret: expectedSecret});
    })
  })

  describe('resetCredentials', () => {
    test('returns expected action with no payload', () => {

      const result = resetCredentials();

      expect(result.type).toEqual('CREDENTIALS__RESET');
      // @ts-ignore
      expect(result.payload).toBeUndefined();
    })
  })

  describe('credentials reducer', () => {
    const initialState: Credentials = {};

    test('CREDENTIALS__SET', () => {
      const expectedId = 'expected-id';
      const expectedSecret = 'expected-secret';

      const result = credentials(initialState, setCredentials(expectedId, expectedSecret));

      expect(result).toEqual({id: expectedId, secret: expectedSecret});
    })

    test('CREDENTIALS__RESET', () => {
      const result = credentials(initialState, resetCredentials());

      expect(result).toEqual({});
    })

    test('Pass through', () => {
      const result = credentials(initialState, {type: 'ANOTHER_ACTION', payload: undefined});

      expect(result).toBe(initialState);
    })

    test('Bootstraps state', () => {
      // @ts-ignore
      const result = credentials(undefined, {type: 'INIT', payload: undefined});

      expect(result).toEqual(initialState);
    })
  })
})