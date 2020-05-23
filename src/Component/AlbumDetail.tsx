import * as React from 'react';
import * as Redux from 'react-redux';
import {match} from 'react-router-dom';
import {AppState} from "../Store/store";

export const AlbumDetail: React.FC<{match: match<{id: string}>}> = props => {
    const albums = Redux.useSelector((state: AppState) => state.albums);
    const id = parseInt(props.match.params.id, 10);
    if (!Number.isInteger(id)) {
        return <div>Album id is not valid</div>
    }
    const album = albums.find(album => album.id === id);

    if (album === undefined) {
        return <div>Album not found</div>;
    }

    return <div>
        <h2>Album!</h2>
        <div>{album.name}</div>
    </div>
};