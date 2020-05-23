import * as React from 'react';
import * as Redux from 'react-redux';
import {Album} from "../Model/Album";
import {AlbumInList} from "./AlbumInList";
import {AppState} from "../Store/store";
import {setAllAlbums} from "../Store/AlbumState";
import {Toolbar} from "./Toolbar";

export const ListOfAlbums: React.FC = props => {
    const dispatch = Redux.useDispatch();
    const albums = Redux.useSelector((state: AppState) => state.albums);
    // todo this should be in state to avoid reload on each render and to allow us to use thunks
    const [fetchState, setFetchState] = React.useState('empty');
    const [abortController, setAbortController] = React.useState(new AbortController());
    React.useEffect(() => () => abortController.abort(), [abortController]); // handle component dismount

    if (fetchState === 'empty') {
        console.debug('loading albums');
        setFetchState('loading');
        setTimeout(() => {
            dispatch(setAllAlbums([
                new Album(1, 'foo'),
                new Album(2, 'bar'),
                new Album(3, 'baz'),
            ]));
            console.debug('loaded albums');
            setFetchState('loaded');
        }, 1000);
    }
    return <div>
        <Toolbar/>
        <ul>
            {albums.map(album => <AlbumInList key={album.id} album={album}/>)}
        </ul>
    </div>
};