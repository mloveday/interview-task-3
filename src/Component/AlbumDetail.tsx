import * as React from 'react';
import * as Redux from 'react-redux';
import {Link, match, useLocation} from 'react-router-dom';
import * as moment from 'moment';
import {AppState} from "../Store/store";
import {getAlbum} from "../Store/AlbumState";

export const AlbumDetail: React.FC<{match: match<{id: string}>}> = props => {
    const albumState = Redux.useSelector((state: AppState) => state.albums);
    const dispatch = Redux.useDispatch();
    const location = useLocation();

    const album = albumState.albums.find(album => album.id === props.match.params.id) ?? (albumState.album?.id === props.match.params.id ? albumState.album : undefined);

    if (album === undefined) {
        if (albumState.singleId !== props.match.params.id || albumState.singleFetchState !== 'loading') {
            dispatch(getAlbum(props.match.params.id));
        }
        return <div>Album not found</div>;
    }

    const image = album.images.length > 0 ? album.images[0] : undefined;

    return <div>
        <Link to={`/${location.search}`}>&lt;&lt; back to list</Link>
        <h2>{album.name}</h2>
        {image && <img src={image.url} alt={`Album artwork`}/>}
        <h3>Artists</h3>
        <ul>{album.artists.map(artist => <li key={artist.id}>{artist.name}</li>)}</ul>
        <h3>Other information</h3>
        <div>Released on {moment(album.release_date).format('dddd, MMMM Do YYYY')}</div>
        <div>{album.total_tracks} tracks</div>
    </div>
};