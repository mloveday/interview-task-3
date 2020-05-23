import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import {Header} from "./Header";
import {Toolbar} from "./Toolbar";
import {ListOfAlbums} from "./ListOfAlbums";
import {AlbumDetail} from "./AlbumDetail";

export const Routing: React.FC = props => {
    return (
        <React.Fragment>
            <Header/>
            <Toolbar/>
            <Switch>
                <Route path='/' exact>
                    <ListOfAlbums/>
                </Route>
                <Route path='/album/:id' exact component={AlbumDetail}/>
                <Route path='*'>
                    <div>Page not found</div>
                </Route>
            </Switch>
        </React.Fragment>)
};