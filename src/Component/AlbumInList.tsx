import * as React from 'react';
import {Album} from "../Model/Album";
import { Link } from 'react-router-dom';

export const AlbumInList: React.FC<{album: Album}> = props => {
    return <li>
        <Link to={`/album/${props.album.id}`}>{props.album.name}</Link>
    </li>
};