import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Header} from "./Header";
import {Toolbar} from "./Toolbar";
import {ListOfAlbums} from "./ListOfAlbums";

export const Routing: React.FC = props => {
    return (
        <React.Fragment>
            <Header/>
            <Toolbar/>
            <Switch>
                <Route path='/' exact>
                    <ListOfAlbums/>
                </Route>
                <Route path='*'>
                    <div>Page not found</div>
                </Route>
            </Switch>
        </React.Fragment>)
};