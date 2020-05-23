import {Album} from "../Model/Album";
import {AppAction} from "../Model/AppAction";
import {fetchSearchAlbums} from "../Service/Fetch";

const ALBUM__LOADING = 'ALBUM__LOADING';
const ALBUM__LOADED = 'ALBUM__LOADED';

export type AlbumState = {
    fetchState: 'empty'|'loading'|'loaded',
    searchTerm: string,
    albums: Album[],
};

export const searchAlbums = (searchTerm: string) => dispatch => {
    dispatch(albumsLoading(searchTerm));
    fetchSearchAlbums(searchTerm).then(r => dispatch(albumsLoaded(r)));
}

const albumsLoading = (searchTerm: string): AppAction<string> => ({
    type: ALBUM__LOADING,
    payload: searchTerm,
});

const albumsLoaded = (albums: Album[]): AppAction<Album[]> => ({
    type: ALBUM__LOADED,
    payload: albums,
});

export const albums = (state: AlbumState = {fetchState: 'empty', searchTerm: '', albums: []}, action: AppAction<any>): AlbumState => {
    switch (action.type) {
        case ALBUM__LOADED:
            return {
                    fetchState: 'loaded',
                    searchTerm: state.searchTerm,
                    albums: (action as AppAction<Album[]>).payload,
                };
        case ALBUM__LOADING:
            return {
                fetchState: 'loading',
                searchTerm: (action as AppAction<string>).payload,
                albums: [],
            };
    }
    return state;
};