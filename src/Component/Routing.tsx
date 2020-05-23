import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Header} from "./Header";
import {Toolbar} from "./Toolbar";
import {ListOfAlbums} from "./ListOfAlbums";
import {AlbumDetail} from "./AlbumDetail";
import {ClientDetails} from "./ClientDetails";

export const Routing: React.FC = props => {
    // todo check for the existence of client details in local storage and prompt for them here if not present
    // normally this would be handled by using a backend of our own where the client secret is stored
    // but this is a simple mockup, and we can just let any users enter their own client credentials to avoid any security issues
    return (
        <React.Fragment>
            <Header/>
            <Toolbar/>
            <Switch>
                <Route path='/' exact component={ListOfAlbums}/>
                <Route path='/credentials' exact component={ClientDetails}/>
                <Route path='/album/:id' exact component={AlbumDetail}/>
                <Route path='*'>
                    <div>Page not found</div>
                </Route>
            </Switch>
        </React.Fragment>)
};