import * as React from 'react';
import * as Redux from 'react-redux';
import {match} from 'react-router-dom';
import {AppState} from "../Store/store";
import {getAlbum} from "../Store/AlbumState";

export const AlbumDetail: React.FC<{match: match<{id: string}>}> = props => {
    const albumState = Redux.useSelector((state: AppState) => state.albums);
    const dispatch = Redux.useDispatch();

    const album = albumState.albums.find(album => album.id === props.match.params.id) ?? (albumState.album?.id === props.match.params.id ? albumState.album : undefined);

    if (album === undefined) {
        if (albumState.singleId !== props.match.params.id || albumState.singleFetchState !== 'loading') {
            dispatch(getAlbum(props.match.params.id));
        }
        return <div>Album not found</div>;
    }

    return <div>
        <h2>Album!</h2>
        <div>{album.name}</div>
    </div>
};