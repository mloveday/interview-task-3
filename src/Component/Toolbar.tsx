import * as React from 'react';
import * as Redux from 'react-redux';
import {AlbumState, clearAlbums, searchAlbums} from "../Store/AlbumState";
import {AppState} from "../Store/store";
import {useHistory, useLocation} from 'react-router-dom';
import * as queryString from 'query-string';
import {debounce} from 'lodash';

const requestSearch = debounce((value: string, state: AlbumState, dispatch) => {
    if (state.abortController !== undefined) {
        state.abortController.abort();
    }
    dispatch(searchAlbums(value));
}, 250);

export const Toolbar: React.FC = props => {
    const history = useHistory();
    const location = useLocation();
    const dispatch = Redux.useDispatch();
    const albumState = Redux.useSelector((state: AppState) => state.albums);
    const query = (queryString.parse(location.search).query as string) ?? '';
    const [searchTerm, setSearchTerm] = React.useState(query);

    const onSearchChange = (value: string) => {
        if (value === '') {
            history.push('');
            dispatch(clearAlbums());
        } else {
            history.push(`?query=${value}`);
            requestSearch(value, albumState, dispatch);
        }
        setSearchTerm(value);
    };

    return <div>
        <form>
            <label>
                <span>Search</span>
                <input type='text' value={searchTerm} onChange={ev => onSearchChange(ev.target.value)} />
            </label>
        </form>
    </div>
};