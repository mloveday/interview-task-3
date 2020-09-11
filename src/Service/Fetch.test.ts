import fetchMock from 'jest-fetch-mock';
import {fetchWithAccessToken, fetchWithAuth, getAccessToken} from "./Fetch";

describe('Service/Fetch', () => {
  const mockExpiredTokenResponse = () => fetchMock.mockResponseOnce(
    JSON.stringify({error: {message: 'The access token expired'}}),
    {status: 401}
  );

  const mockUrl =(url) => `https://api.spotify.com${url}`;

  describe('getAccessToken', () => {
    beforeEach(() => {
      fetchMock.enableMocks();
      fetchMock.resetMocks();
      localStorage.clear();
      // @ts-ignore
      localStorage.setItem.mockClear();
    })
    
    test('successful response sets token in storage and returns token', () => {
      const expectedAccessToken = 'expected_access_token';
      fetchMock.mockResponseOnce(JSON.stringify({access_token: expectedAccessToken}))
      return getAccessToken().then(result => {
        expect(result).toEqual(expectedAccessToken);
        expect(localStorage.setItem).toHaveBeenCalledWith('SPOTIFY_ACCESS_TOKEN', expectedAccessToken);
      });
    })
  })

  describe('fetchWithAuth', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      localStorage.clear();
      (localStorage.setItem as jest.Mock).mockClear();
    })

    test('with access token in storage, fetches', () => {
      localStorage.setItem('SPOTIFY_ACCESS_TOKEN', 'some-token');
      const url = '/some-url';
      const expectedResponse = {value: 'expectedResponse'};
      fetchMock.mockResponse((req: Request) => req.url === mockUrl(url) ? Promise.resolve(JSON.stringify(expectedResponse)) : Promise.reject());

      const response = fetchWithAuth(url, new AbortController());

      expect.assertions(1);
      return response.then(result => expect(result).toEqual(expectedResponse));
    })

    test('with no access token in storage, gets access token then fetches', () => {
      const expectedAccessToken = 'expected_access_token';
      const url = '/some-url';
      const expectedResponse = {value: 'expectedResponse'};
      fetchMock.mockResponse((req: Request) => {
        switch(req.url) {
          case 'https://accounts.spotify.com/api/token':
            return Promise.resolve(JSON.stringify({access_token: expectedAccessToken}));
          case mockUrl(url):
            return Promise.resolve(JSON.stringify(expectedResponse));
        }
        return Promise.reject();
      });

      const response = fetchWithAuth(url, new AbortController());

      expect.assertions(2);
      return response.then(result => {
        expect(localStorage.setItem).toHaveBeenCalledWith('SPOTIFY_ACCESS_TOKEN', expectedAccessToken);
        expect(result).toEqual(expectedResponse);
      });
    })

    test('with expired access token in storage, gets new access token then fetches', () => {
      // given expired token
      const expiredToken = 'expired_token';
      localStorage.setItem('SPOTIFY_ACCESS_TOKEN', expiredToken);
      (localStorage.setItem as jest.Mock).mockClear();
      const validToken = 'valid_token';
      const url = '/some-url';
      const expectedResponse = {value: 'expectedResponse'};

      fetchMock.mockResponse((req: Request) => {
        if (req.headers.get('Authorization') === `Bearer ${expiredToken}`) {
          return Promise.resolve({
            body: JSON.stringify({error: {message: 'The access token expired'}}),
            status: 401,
          });
        }
        switch(req.url) {
          case 'https://accounts.spotify.com/api/token':
            return Promise.resolve(JSON.stringify({access_token: validToken}));
          case mockUrl(url):
            return Promise.resolve(JSON.stringify(expectedResponse));
        }
        return Promise.reject();
      });

      const response = fetchWithAuth(url, new AbortController());

      expect.assertions(2);
      return response.then(result => {
        expect(localStorage.setItem).toHaveBeenCalledWith('SPOTIFY_ACCESS_TOKEN', validToken);
        expect(result).toEqual(expectedResponse);
      });
    })
  })

  describe('fetchWithAccessToken', () => {
    beforeEach(() => {
      fetchMock.enableMocks();
      fetchMock.resetMocks();
      localStorage.clear();
      (localStorage.setItem as jest.Mock).mockClear();
    })

    test('OK response, returns parsed response', () => {
      const expectedResponse = {value: 'expectedResponse'};
      fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));

      const response = fetchWithAccessToken('/url', 'bar', new AbortController());

      expect.assertions(1);
      return response.then(result => expect(result).toEqual(expectedResponse));
    })

    test('401 response for expired access token, throws expired token error', () => {
      const requestUrl = '/some-url';
      mockExpiredTokenResponse();

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