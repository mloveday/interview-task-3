import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Album} from "../Model/Album";
import {albums} from "./AlbumState";
import {credentials, Credentials} from "./CredentialsState";

// TODO add the state shape here
export type AppState = {
    albums: Album[],
    credentials: Credentials,
};

// TODO add the reducers here
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