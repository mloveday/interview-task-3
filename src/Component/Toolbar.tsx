import * as React from 'react';
import * as Redux from 'react-redux';
import {AlbumState, clearAlbums, searchAlbums} from "../Store/AlbumState";
import {AppState} from "../Store/store";
import {useHistory, useLocation} from 'react-router-dom';
import * as queryString from 'query-string';
import debounce from 'lodash/debounce';

const requestSearch = debounce((value: string, state: AlbumState, dispatch) => {
    if (value === '') {
        dispatch(clearAlbums());
        return;
    }
    if (state.abortController !== undefined) {
        state.abortController.abort();
    }
    dispatch(searchAlbums(value));
}, 250);

export const Toolbar: React.FC = () => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = Redux.useDispatch();
    const albumState = Redux.useSelector((state: AppState) => state.albums);
    const [searchTerm, setSearchTerm] = React.useState<string>();

    if (searchTerm === undefined) {
        const query = (queryString.parse(location.search).query as string) ?? '';
        setSearchTerm(query);
        if (albumState.searchTerm !== query) {
            requestSearch(query, albumState, dispatch);
        }
    }

    const onSearchChange = (value: string) => {
        history.push(value === '' ? '' : `?query=${value}`);
        requestSearch(value, albumState, dispatch);
        setSearchTerm(value);
    };

    return <div>
        <form onSubmit={e => e.preventDefault()}>
            <label>
                <span>Search albums</span>
                <input id='search-input' type='text' value={searchTerm} onChange={ev => onSearchChange(ev.target.value)} />
            </label>
        </form>
    </div>
};