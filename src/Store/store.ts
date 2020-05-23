import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// TODO add the state shape here
export type AppState = {
};

// TODO add the reducers here
const rootReducer = combineReducers<AppState>({
});

// @ts-ignore
export const store = createStore(
    rootReducer,
    undefined,
    composeWithDevTools(applyMiddleware(thunk))
);