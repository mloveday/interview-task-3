import * as React from 'react';
import {Album} from "../Model/Album";
import {Link, useLocation} from 'react-router-dom';

export const AlbumInList: React.FC<{album: Album}> = props => {
    const location = useLocation();
    return <li>
        <Link to={`/album/${props.album.id}${location.search}`}>{props.album.name}</Link>
    </li>
};