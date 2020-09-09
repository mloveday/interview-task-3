import fetchMock from 'jest-fetch-mock';
import {getAccessToken} from "./Fetch";

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
})