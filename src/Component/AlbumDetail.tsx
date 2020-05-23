import * as React from 'react';
import * as Redux from 'react-redux';
import {match} from 'react-router-dom';
import {AppState} from "../Store/store";

export const AlbumDetail: React.FC<{match: match<{id: string}>}> = props => {
    const albumState = Redux.useSelector((state: AppState) => state.albums);
    const album = albumState.albums.find(album => album.id === props.match.params.id);

    if (album === undefined) {
        return <div>Album not found</div>;
    }

    return <div>
        <h2>Album!</h2>
        <div>{album.name}</div>
    </div>
};