import {Album} from "../Model/Album";
import {AppAction} from "../Model/AppAction";
import {fetchSearchAlbums} from "../Service/Fetch";

const ALBUM__LOADING = 'ALBUM__LOADING';
const ALBUM__LOADED = 'ALBUM__LOADED';

export type AlbumState = {
    fetchState: 'empty'|'loading'|'loaded',
    searchTerm: string,
    albums: Album[],
    abortController?: AbortController,
};

export const searchAlbums = (searchTerm: string) => dispatch => {
    const abortController = new AbortController();
    dispatch(albumsLoading(searchTerm, abortController));
    fetchSearchAlbums(searchTerm, abortController).then(r => dispatch(albumsLoaded(r)));
}

const albumsLoading = (searchTerm: string, abortController): AppAction<{searchTerm: string, abortController: AbortController}> => ({
    type: ALBUM__LOADING,
    payload: {searchTerm, abortController},
});

const albumsLoaded = (albums: Album[]): AppAction<Album[]> => ({
    type: ALBUM__LOADED,
    payload: albums,
});

export const albums = (state: AlbumState = {fetchState: 'loaded', searchTerm: '', albums: []}, action: AppAction<any>): AlbumState => {
    switch (action.type) {
        case ALBUM__LOADED:
            return {
                    fetchState: 'loaded',
                    searchTerm: state.searchTerm,
                    albums: (action as AppAction<Album[]>).payload,
                    abortController: undefined,
                };
        case ALBUM__LOADING:
            const loadingAction = action as AppAction<{searchTerm: string, abortController: AbortController}>;
            return {
                fetchState: 'loading',
                searchTerm: loadingAction.payload.searchTerm,
                albums: [],
                abortController: loadingAction.payload.abortController,
            };
    }
    return state;
};