import {Album} from "../Model/Album";
import {AppAction} from "../Model/AppAction";
import {fetchAlbum, fetchSearchAlbums} from "../Service/SpotifyApi";

const ALBUMS__LOADING = 'ALBUMS__LOADING';
const ALBUMS__LOADED = 'ALBUMS__LOADED';
const ALBUM__LOADING = 'ALBUM__LOADING';
const ALBUM__LOADED = 'ALBUM__LOADED';

export type AlbumState = {
    fetchState: 'empty'|'loading'|'loaded',
    searchTerm: string,
    singleFetchState: 'empty'|'loading'|'loaded',
    singleId?: string,
    album?: Album,
    albums: Album[],
    abortController?: AbortController,
};

export const searchAlbums = (searchTerm: string) => dispatch => {
    const abortController = new AbortController();
    dispatch(albumsLoading(searchTerm, abortController));
    return fetchSearchAlbums(searchTerm, abortController)
        .then(r => dispatch(albumsLoaded(r.albums?.items ?? [])));
}

export const getAlbum = (id: string) => dispatch => {
    const abortController = new AbortController();
    dispatch(albumLoading(id, abortController));
    return fetchAlbum(id, abortController)
        .then(r => dispatch(albumLoaded(r)));
}

export const clearAlbums = () => albumsLoaded([]);

const albumsLoading = (searchTerm: string, abortController): AppAction<{searchTerm: string, abortController: AbortController}> => ({
    type: ALBUMS__LOADING,
    payload: {searchTerm, abortController},
});

const albumsLoaded = (albums: Album[]): AppAction<Album[]> => ({
    type: ALBUMS__LOADED,
    payload: albums,
});

const albumLoading = (id: string, abortController): AppAction<{id: string, abortController: AbortController}> => ({
    type: ALBUM__LOADING,
    payload: {id, abortController},
});

const albumLoaded = (album: Album): AppAction<Album> => ({
    type: ALBUM__LOADED,
    payload: album,
});

export const albums = (state: AlbumState = {fetchState: 'loaded', searchTerm: '', albums: [], singleFetchState: 'empty'}, action: AppAction<any>): AlbumState => {
    switch (action.type) {
        case ALBUMS__LOADED:
            return {
                fetchState: 'loaded',
                searchTerm: state.searchTerm,
                album: state.album,
                albums: (action as AppAction<Album[]>).payload,
                abortController: undefined,
                singleFetchState: state.singleFetchState,
                singleId: state.singleId
            };
        case ALBUMS__LOADING:
            const loadingAction = action as AppAction<{searchTerm: string, abortController: AbortController}>;
            return {
                fetchState: 'loading',
                searchTerm: loadingAction.payload.searchTerm,
                album: state.album,
                albums: [],
                abortController: loadingAction.payload.abortController,
                singleFetchState: state.singleFetchState,
                singleId: state.singleId
            };
        case ALBUM__LOADED:
            return {
                fetchState: state.fetchState,
                searchTerm: state.searchTerm,
                album: (action as AppAction<Album>).payload,
                albums: state.albums,
                abortController: undefined,
                singleFetchState: 'loaded',
                singleId: state.singleId
            };
        case ALBUM__LOADING:
            const albumLoadingAction = action as AppAction<{id: string, abortController: AbortController}>;
            return {
                fetchState: state.fetchState,
                searchTerm: state.searchTerm,
                singleFetchState: 'loading',
                singleId: albumLoadingAction.payload.id,
                album: state.album,
                albums: [],
                abortController: albumLoadingAction.payload.abortController,
            };
    }
    return state;
};