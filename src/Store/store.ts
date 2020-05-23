import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {Album} from "../Model/Album";
import {albums} from "./AlbumState";

// TODO add the state shape here
export type AppState = {
    albums: Album[],
};

// TODO add the reducers here
const rootReducer = combineReducers<AppState>({
    albums,
});

// @ts-ignore
export const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);