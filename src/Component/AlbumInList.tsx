import * as React from 'react';
import {Album} from "../Model/Album";

export const AlbumInList: React.FC<{album: Album}> = props => {
    return <li>{props.album.name}</li>
};