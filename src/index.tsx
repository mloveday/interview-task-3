import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from "./Store/store";
import {Routing} from "./Component/Routing";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routing/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('react-root'),
);