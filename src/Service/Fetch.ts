import {encode} from 'js-base64';

export const clientIdKey = 'SPOTIFY_CLIENT_ID';
export const clientSecretKey = 'SPOTIFY_CLIENT_SECRET';
const accessTokenKey = 'SPOTIFY_ACCESS_TOKEN';

const ERR_CODE__AUTH_EXPIRED = 'ERR_CODE__AUTH_EXPIRED';

export const getAccessToken = () => {
  return fetch(`https://accounts.spotify.com/api/token`, {
    method: 'POST',
    body: new URLSearchParams({'grant_type': 'client_credentials'}),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encode(`${localStorage.getItem(clientIdKey)}:${localStorage.getItem(clientSecretKey)}`)}`,
    }
  })
    .then(r => r.json())
    .then(r => {
      localStorage.setItem(accessTokenKey, r.access_token);
      return r.access_token;
    });
  // todo handle errors
}

export const fetchWithAuth = (url: string, abortController: AbortController) => {
  const accessToken = localStorage.getItem(accessTokenKey);
  if (!accessToken) {
    return getAccessToken().then(r => fetchWithAccessToken(url, r, abortController));
  }
  return fetchWithAccessToken(url, accessToken, abortController)
    .catch((r: Error) => {
      if (r.message === ERR_CODE__AUTH_EXPIRED) {
        return getAccessToken().then(r => fetchWithAccessToken(url, r, abortController));
      }
      throw r;
    });
};

export const fetchWithAccessToken = (url: string, accessToken: string, abortController: AbortController) => fetch
(`https://api.spotify.com${url}`, {
  signal: abortController.signal,
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  }
}).then(r => {
  if (r.ok) {
    return r.json();
  }
  if (r.status === 401) {
    return r.json().then(r => {
      if (r.error?.message === 'The access token expired') {
        throw new Error(ERR_CODE__AUTH_EXPIRED);
      }
      throw r;
    })
  }
  return r.json();
});