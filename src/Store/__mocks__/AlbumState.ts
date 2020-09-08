import {Album} from "../../Model/Album";
import {AppAction} from "../../Model/AppAction";
import {AlbumState} from "../AlbumState";

const ALBUMS__LOADING = 'ALBUMS__LOADING';
const ALBUMS__LOADED = 'ALBUMS__LOADED';
const ALBUM__LOADING = 'ALBUM__LOADING';
const ALBUM__LOADED = 'ALBUM__LOADED';

// mock thunk methods to avoid the need for further mocks (e.g. fetch, localStorage)

export const searchAlbums = (searchTerm: string) => ({type: 'mock_searchAlbums', searchTerm})
export const getAlbum = (id: string) => ({type: 'mock_getAlbum', id})

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

export const albums = (state = {}, action) => state;