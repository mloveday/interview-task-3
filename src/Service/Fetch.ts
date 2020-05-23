export const clientIdKey = 'SPOTIFY_CLIENT_ID';
export const clientSecretKey = 'SPOTIFY_CLIENT_SECRET';
const accessTokenKey = 'SPOTIFY_ACCESS_TOKEN';

export const getAccessToken = () => {
    return fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        body: new URLSearchParams({'grant_type': 'client_credentials'}),
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${localStorage.getItem(clientIdKey)}:${localStorage.getItem(clientSecretKey)}`)}`,
        }
    })
        .then(r => r.json())
        .then(r => {
            localStorage.setItem(accessTokenKey, r.access_token);
            console.debug({
                fn: 'getAccessToken',
                r,
            });
            return r.access_token;
        });
    // todo handle errors
}

export const fetchWithAuth = (url: string) => {
    // todo if access token expired, refresh it (and then make the request)
    const accessToken = localStorage.getItem(accessTokenKey);
    if (!accessToken) {
        return getAccessToken().then(r => fetchWithAccessToken(url, r));
    }
    return fetchWithAccessToken(url, accessToken);
};

const fetchWithAccessToken = (url: string, accessToken) =>  fetch
(`https://api.spotify.com${url}`, {
    headers: {
        'Authorization': `Bearer ${accessToken}`,
    }
}).then(r => r.json());