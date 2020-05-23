import * as React from 'react';
import {clientIdKey, clientSecretKey} from "../Service/Fetch";

export const ClientDetails: React.FC = props => {
    const [id, setId] = React.useState(localStorage.getItem(clientIdKey));
    const [secret, setSecret] = React.useState(localStorage.getItem(clientSecretKey));
    const putInStorage = () => {
        console.debug('Storing credentials in local storage');
        localStorage.setItem(clientIdKey, id);
        localStorage.setItem(clientSecretKey, secret);
    };
    const deleteFromStorage = () => {
        console.debug('Deleting credentials from local storage');
        localStorage.removeItem(clientIdKey);
        localStorage.removeItem(clientSecretKey);
        setId('');
        setSecret('');
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