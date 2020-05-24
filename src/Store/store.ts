import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {albums, AlbumState} from "./AlbumState";
import {credentials, Credentials} from "./CredentialsState";

export type AppState = {
    albums: AlbumState,
    credentials: Credentials,
};

const rootReducer = combineReducers<AppState>({
    albums,
    credentials,
});

// @ts-ignore
export const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);