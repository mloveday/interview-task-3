import * as React from 'react';
import * as Redux from 'react-redux';
import {clientIdKey, clientSecretKey} from "../Service/Fetch";
import {resetCredentials} from "../Store/CredentialsState";

export const ClientDetails: React.FC = props => {
    // normally this would be handled by using a backend of our own where the client secret is stored
    // but this is a simple mockup, and we can just let any users enter their own client credentials to avoid any security issues
    const dispatch = Redux.useDispatch();
    const [id, setId] = React.useState(localStorage.getItem(clientIdKey));
    const [secret, setSecret] = React.useState(localStorage.getItem(clientSecretKey));
    const putInStorage = () => {
        console.debug('Storing credentials in local storage');
        localStorage.setItem(clientIdKey, id);
        localStorage.setItem(clientSecretKey, secret);
        dispatch(resetCredentials()); // this will be picked up in routing and allows navigation to other pages
    };
    const deleteFromStorage = () => {
        console.debug('Deleting credentials from local storage');
        localStorage.removeItem(clientIdKey);
        localStorage.removeItem(clientSecretKey);
        setId('');
        setSecret('');
        dispatch(resetCredentials()); // this will be picked up in routing and allows navigation to other pages
    };
    return <div>
        <h3>Please enter your Spotify client details below to enable API access</h3>
        <div>
            <p>
                Note that this stores the details in local storage only.
                These details are required by the Spotify API, but should not be checked in to source control.
                To get a client key & secret, head to <a href='https://developer.spotify.com/dashboard/login'>The Spotify developer dashboard</a> and create a new app.
            </p>
            <p>
                Keep them secret, keep them safe.
            </p>
        </div>
        <form>
            <label>
                <span>Client ID</span>
                <input value={id} onChange={ev => setId(ev.target.value)}/>
            </label>
            <label>
                <span>Client secret</span>
                <input value={secret} onChange={ev => setSecret(ev.target.value)}/>
            </label>
            <button type='button' onClick={putInStorage}>Save to local storage</button>
            <br/>
            <button type='button' onClick={deleteFromStorage}>Remove from local storage</button>
        </form>
    </div>
}