import 'jsdom-global/register';
import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import MockRouter, {Router, useHistory } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {NavBar} from "./NavBar";
import {Routing} from "./Routing";
import {Header} from "./Header";
import {clientIdKey, clientSecretKey} from "../Service/Fetch";
import {setCredentials} from "../Store/CredentialsState";
import {ClientDetails} from "./ClientDetails";
import {ListOfAlbums} from "./ListOfAlbums";
import {AlbumDetail} from "./AlbumDetail";

jest.mock('../Store/AlbumState');

describe('Routing component', () => {
  const render = (store, history) => Enzyme.mount(
    <Provider store={store}>
      <Router history={history}>
        <Routing/>
      </Router>
    </Provider>
  );

  const getStore = (credentials) => configureStore([thunk])({credentials, albums: {albums: []}});

  const getCredentials = () => ({
    id: 'some-id',
    secret: 'some-secret',
  });

  beforeEach(() => {
    localStorage.clear();
  })

  const setUpCredentials = () => {
    const credentials = getCredentials();
    localStorage.setItem(clientIdKey, credentials.id);
    localStorage.setItem(clientSecretKey, credentials.secret);
    return credentials;
  }

  test('Given credentials in localStorage and state, renders page structure', () => {
    const credentials = setUpCredentials();
    const history = createMemoryHistory({initialEntries: ['/']});
    const mockStore = getStore(credentials);

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual('/');
    expect(result.find(Header)).toHaveLength(1);
    expect(result.find('main')).toHaveLength(1);
    expect(result.find(NavBar)).toHaveLength(1);
  });

  test('Given credentials in localStorage only, sets credentials in state', () => {
    const credentials = setUpCredentials();
    const history = createMemoryHistory({initialEntries: ['/']});
    const mockStore = getStore({});

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual('/');
    const actions = mockStore.getActions();
    expect(actions).toEqual([setCredentials(credentials.id, credentials.secret)]);
  });

  test('Given no credentials, redirects to credentials page', () => {
    const history = createMemoryHistory({initialEntries: ['/']});
    const mockStore = getStore({});

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual('/credentials');
  });

  test('Shows credentials content', () => {
    const credentials = setUpCredentials();
    const history = createMemoryHistory({initialEntries: ['/credentials']});
    const mockStore = getStore(credentials);

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual('/credentials');
    expect(result.find(ClientDetails)).toHaveLength(1);
  });

  test('Shows list of albums content', () => {
    const credentials = setUpCredentials();
    const history = createMemoryHistory({initialEntries: ['/']});
    const mockStore = getStore(credentials);

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual('/');
    expect(result.find(ListOfAlbums)).toHaveLength(1);
  });

  test('Shows album details content', () => {
    const credentials = setUpCredentials();
    const history = createMemoryHistory({initialEntries: ['/album/1']});
    const mockStore = getStore(credentials);

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual('/album/1');
    expect(result.find(AlbumDetail)).toHaveLength(1);
  });

  test('Shows 404 content', () => {
    const invalidRoute = '/not-an-existing-route';
    const credentials = setUpCredentials();
    const history = createMemoryHistory({initialEntries: [invalidRoute]});
    const mockStore = getStore(credentials);

    const result = render(mockStore, history);

    expect(history.location.pathname).toEqual(invalidRoute);
    expect(result.contains(<div>Page not found</div>)).toEqual(true);
  });
});
