import {Album} from "../Model/Album";
import {AppAction} from "../Model/AppAction";

const ALBUM__SET_ALL = 'ALBUM__SET_ALL';

export const setAllAlbums = (albums: Album[]): AppAction<Album[]> => ({
    type: ALBUM__SET_ALL,
    payload: albums,
});

export const albums = (state: Album[] = [], action: AppAction<any>): Album[] => {
    switch (action.type) {
        case ALBUM__SET_ALL:
            return (action as AppAction<Album[]>).payload;
    }
    return state;
};