import 'jsdom-global/register';
import * as React from 'react';
import configureStore from 'redux-mock-store';
import Router, { useHistory } from 'react-router';
import Enzyme from 'enzyme';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import {Toolbar} from "./Toolbar";
import {searchAlbums} from "../Store/__mocks__/AlbumState";
import H from 'history';
import {clearAlbums} from "../Store/AlbumState";

jest.mock('../Store/AlbumState');

jest.mock("lodash/debounce", () =>
  jest.fn(fn => {
    fn.cancel = jest.fn();
    return fn;
  })
);

describe('Toolbar component', () => {
  const mockLocation = (search): H.Location => ({
    pathname: '/url',
    hash: '',
    search: search ? `?query=${search}` : undefined,
    state: undefined,
  });

  const mockHistory = (location): H.History => ({
    length: 0,
    action: 'PUSH',
    location,
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    block: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
  });

  const getStore = () => configureStore([thunk])({albums: {}});

  const render = (store) => Enzyme.mount(
    <Provider store={store}>
      <BrowserRouter>
        <Toolbar/>
      </BrowserRouter>
    </Provider>
  );

  test('Gets search term from URL query and populates input', () => {
    const expectedSearch = 'expected search';
    const location = mockLocation(expectedSearch);
    jest.spyOn(Router, 'useLocation').mockReturnValue(location);
    jest.spyOn(Router, 'useHistory').mockReturnValue(mockHistory(location));
    const store = getStore();

    const result = render(store);

    expect(result.find('#search-input').props().value).toEqual(expectedSearch);

    const actions = store.getActions();
    expect(actions).toEqual([searchAlbums(expectedSearch)]);
  });

  test('Does not make new request when search already fetched', () => {
    const expectedSearch = 'expected search';
    const location = mockLocation(expectedSearch);
    jest.spyOn(Router, 'useLocation').mockReturnValue(location);
    jest.spyOn(Router, 'useHistory').mockReturnValue(mockHistory(location));
    const store = configureStore([thunk])({
      albums: {
        searchTerm: expectedSearch,
      }
    });

    const result = render(store);

    expect(result.find('#search-input').props().value).toEqual(expectedSearch);

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  test('Searches for term when search has changed', () => {
    const priorSearch = 'prior search';
    const expectedSearch = 'new search';
    const location = mockLocation(priorSearch);
    jest.spyOn(Router, 'useLocation').mockReturnValue(location);
    jest.spyOn(Router, 'useHistory').mockReturnValue(mockHistory(location));
    const store = getStore();

    const result = render(store);

    result.find('#search-input').simulate('change', {target: {value: expectedSearch}});

    const actions = store.getActions();
    expect(actions).toEqual([searchAlbums(priorSearch), searchAlbums(expectedSearch)]);

    expect((useHistory().push as jest.Mock).mock.calls[0][0]).toEqual(`?query=${expectedSearch}`);
  });

  test('Uses empty search term by default if none provided', () => {
    const expectedSearch = undefined;
    jest.spyOn(Router, 'useLocation').mockReturnValue(mockLocation(expectedSearch));
    jest.spyOn(Router, 'useHistory');
    const store = getStore();

    const result = render(store);

    const actions = store.getActions();
    expect(actions).toEqual([clearAlbums()]);
  });

  test('On clearing search term, empties searched albums state', () => {
    const priorSearch = 'prior search';
    const emptySearch = '';
    const location = mockLocation(priorSearch);
    jest.spyOn(Router, 'useLocation').mockReturnValue(location);
    jest.spyOn(Router, 'useHistory').mockReturnValue(mockHistory(location));
    const store = getStore();

    const result = render(store);

    result.find('#search-input').simulate('change', {target: {value: emptySearch}});

    const actions = store.getActions();
    expect(actions).toEqual([searchAlbums(priorSearch), clearAlbums()]);

    expect((useHistory().push as jest.Mock).mock.calls[0][0]).toEqual('');
  });

  test('When a prior search was started, aborts that search', () => {
    jest.spyOn(Router, 'useLocation').mockReturnValue(mockLocation('some-search'));
    jest.spyOn(Router, 'useHistory');
    const abortController = {abort: jest.fn()};

    render(configureStore([thunk])({albums: {abortController}}));

    expect(abortController.abort).toHaveBeenCalledTimes(1);
  })
})