import * as React from 'react';
import * as Redux from 'react-redux';
import {AlbumInList} from "./AlbumInList";
import {AppState} from "../Store/store";
import {Toolbar} from "./Toolbar";

export const ListOfAlbums: React.FC = props => {
    const albumState = Redux.useSelector((state: AppState) => state.albums);

    return <div>
        <Toolbar/>
        <ul>
            {albumState.albums.map(album => <AlbumInList key={album.id} album={album}/>)}
        </ul>
    </div>
};