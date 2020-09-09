import fetchMock from 'jest-fetch-mock';
import {fetchWithAccessToken, getAccessToken} from "./Fetch";

describe('Service/Fetch', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    localStorage.clear();
  })

  describe('getAccessToken', () => {
    test('successful response sets token in storage and returns token', () => {
      const expectedAccessToken = 'expected_access_token';
      fetchMock.mockResponseOnce(JSON.stringify({access_token: expectedAccessToken}))
      return getAccessToken().then(result => {
        expect(result).toEqual(expectedAccessToken);
        expect(localStorage.setItem).toHaveBeenCalledWith('SPOTIFY_ACCESS_TOKEN', expectedAccessToken);
      });
    })

    // todo all the other important tests for existing functionality
    // todo test failure cases, fix up handling them elsewhere
  })
  describe('fetchWithAuth', () => {
    test.skip('with access token in storage, fetches', () => {
      // todo
    })
    test.skip('with no access token in storage, gets access token then fetches', () => {
      // todo
    })
    test.skip('with expired access token in storage, gets new access token then fetches', () => {
      // todo
    })
  })

  describe('fetchWithAccessToken', () => {
    test('OK response, returns parsed response', () => {
      const expectedResponse = {value: 'expectedResponse'};
      fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));

      const response = fetchWithAccessToken('/url', 'bar', new AbortController());

      expect.assertions(1);
      return response.then(result => expect(result).toEqual(expectedResponse));
    })

    test('401 response for expired access token, throws expired token error', () => {
      const requestUrl = '/some-url';
      fetchMock.mockResponseOnce(JSON.stringify({error: {message: 'The access token expired'}}), {status: 401});

      const response = fetchWithAccessToken(requestUrl, 'bar', new AbortController());

      expect.assertions(1);
      return response.catch(result => expect(result).toEqual(new Error('ERR_CODE__AUTH_EXPIRED')));
    })

    test('Generic 401 response, returns response', () => {
      const requestUrl = '/some-url';
      const expectedResponse = {value: 'expectedResponse'};
      fetchMock.mockResponseOnce(JSON.stringify(expectedResponse), {status: 401});

      const response = fetchWithAccessToken(requestUrl, 'bar', new AbortController());

      expect.assertions(1);
      return response.then(result => expect(result).toEqual(expectedResponse));
    })

    test('Bad response, returns response', () => {
      const expectedResponse = {value: 'expectedResponse'};
      fetchMock.mockResponseOnce(JSON.stringify(expectedResponse), {status: 404});

      const response = fetchWithAccessToken('/url', 'bar', new AbortController());

      expect.assertions(1);
      return response.then(result => expect(result).toEqual(expectedResponse));
    })
  })
})