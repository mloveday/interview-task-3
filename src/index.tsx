import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from "./Store/store";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ul>
                <li><Link to='/'>home</Link></li>
                <li><Link to='/different'>different</Link></li>
                <li><Link to='/foo'>fail</Link></li>
            </ul>
            <Switch>
                <Route exact path='/'>
                    <div>Success!</div>
                </Route>
                <Route path='/different'>
                    <div>Success! This is a different page</div>
                </Route>
                <Route path='*'>
                    <div>Fail! This page does not exist</div>
                </Route>
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-root'),
);