import * as React from 'react';

export const ClientDetails: React.FC = props => {
    const [id, setId] = React.useState('');
    const [secret, setSecret] = React.useState('');
    const submit = () => {
        console.debug('Storing credentials in local storage');
        // TODO actually save in local storage
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
            <button type='button' onClick={submit}>Save to local storage</button>
        </form>
    </div>
}