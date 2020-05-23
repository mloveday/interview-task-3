import * as React from 'react';
import {Album} from "../Model/Album";
import {AlbumInList} from "./AlbumInList";

export const ListOfAlbums: React.FC = props => {
    const albums = [
        new Album(1, 'foo'),
        new Album(2, 'bar'),
        new Album(3, 'baz'),
    ];
    return <div>
        <ul>
            {albums.map(album => <AlbumInList key={album.id} album={album}/>)}
        </ul>
    </div>
};