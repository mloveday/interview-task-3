import {AppAction} from "../Model/AppAction";

const CREDENTIALS__SET = 'CREDENTIALS__SET';
const CREDENTIALS__RESET = 'CREDENTIALS__RESET';

export type Credentials = { id?: string, secret?: string };

export const setCredentials = (id: string, secret: string): AppAction<Credentials> => ({
    type: CREDENTIALS__SET,
    payload: {id, secret},
});

export const resetCredentials = () => ({type: CREDENTIALS__RESET});

export const credentials = (state: Credentials = {}, action: AppAction<any>): Credentials => {
    switch (action.type) {
        case CREDENTIALS__SET:
            return (action as AppAction<Required<Credentials>>).payload;
        case CREDENTIALS__RESET:
            return {};
    }
    return state;
};