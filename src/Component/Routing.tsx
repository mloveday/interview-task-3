import * as React from 'react';
import * as Redux from 'react-redux';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Header} from "./Header";
import {Toolbar} from "./Toolbar";
import {ListOfAlbums} from "./ListOfAlbums";
import {AlbumDetail} from "./AlbumDetail";
import {ClientDetails} from "./ClientDetails";
import {clientIdKey, clientSecretKey} from "../Service/Fetch";
import {resetCredentials, setCredentials} from "../Store/CredentialsState";
import {AppState} from "../Store/store";
import {NavBar} from "./NavBar";
import styled from 'styled-components';

const CompactMain = styled.main`
  padding-top: 0;
`;

export const Routing: React.FC = props => {
    const dispatch = Redux.useDispatch();
    const credentials = Redux.useSelector((state: AppState) => state.credentials);

    const clientId = localStorage.getItem(clientIdKey);
    const clientSecret = localStorage.getItem(clientSecretKey);

    if ((clientId && !credentials.id) || (clientSecret && !credentials.secret)) {
        dispatch(setCredentials(clientId, clientSecret));
    }

    const isMissingClientDetails = !clientId || !clientSecret;
    return (
        <React.Fragment>
            <Header/>
            <CompactMain>
                <NavBar/>
                <Switch>
                    <Route path='/credentials' exact component={ClientDetails}/>
                    {isMissingClientDetails && <Redirect to='/credentials'/>}
                    <Route path='/' exact component={ListOfAlbums}/>
                    <Route path='/album/:id' exact component={AlbumDetail}/>
                    <Route path='*'>
                        <div>Page not found</div>
                    </Route>
                </Switch>
            </CompactMain>
        </React.Fragment>)
};