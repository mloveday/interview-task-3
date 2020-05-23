import * as React from 'react';
import * as Redux from 'react-redux';
import {AlbumInList} from "./AlbumInList";
import {AppState} from "../Store/store";
import {searchAlbums} from "../Store/AlbumState";
import {Toolbar} from "./Toolbar";

export const ListOfAlbums: React.FC = props => {
    const dispatch = Redux.useDispatch();
    const albumState = Redux.useSelector((state: AppState) => state.albums);

    // todo this will also need to check the search term that is being fetched and potentially call abort on an AbortController (stored in redux)
    if (albumState.fetchState === 'empty') {
        dispatch(searchAlbums('foo'));
    }
    return <div>
        <Toolbar/>
        <ul>
            {albumState.albums.map(album => <AlbumInList key={album.id} album={album}/>)}
        </ul>
    </div>
};