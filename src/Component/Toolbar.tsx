import * as React from 'react';
import * as Redux from 'react-redux';
import {searchAlbums} from "../Store/AlbumState";
import {AppState} from "../Store/store";

export const Toolbar: React.FC = props => {
    const dispatch = Redux.useDispatch();
    const albumState = Redux.useSelector((state: AppState) => state.albums);
    const [searchTerm, setSearchTerm] = React.useState('');

    // todo debounce this
    if (albumState.fetchState === 'empty' || albumState.searchTerm !== searchTerm) {
        if (albumState.abortController !== undefined) {
            albumState.abortController.abort();
        }
        dispatch(searchAlbums(searchTerm));
    }
    return <div>
        <form>
            <label>
                <span>Search</span>
                <input type='text' value={searchTerm} onChange={ev => setSearchTerm(ev.target.value)} />
            </label>
        </form>
    </div>
};