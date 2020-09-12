import 'jsdom-global/register';
import * as React from 'react';
import configureStore from 'redux-mock-store';
import Router from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
import * as Enzyme from 'enzyme';
import {getAlbum} from "../Store/AlbumState";
import {AlbumDetail} from "./AlbumDetail";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {Link, BrowserRouter} from 'react-router-dom';
import moment = require('moment');

Enzyme.configure({adapter: new Adapter()})

jest.mock('../Store/AlbumState')

describe('AlbumDetail component', () => {
  const mockLocation = {
    pathname: '',
    hash: '',
    search: '?foo=bar',
    state: '',
  }
  const match = {params: {id: '1'}, isExact: true, path: '', url: ''}

  const createAlbum = (id, artists, images) => ({
    id,
    name: 'foobar',
    artists: artists,
    release_date: '2020-09-08',
    total_tracks: 5,
    images: images,
  })

  const createState = (id, fetchState, albums, album?) => ({
    albums: {
      fetchState: 'empty',
      searchTerm: '',
      singleFetchState: fetchState,
      singleId: id,
      albums,
      album,
    }
  })

  const render = (mockStore) => Enzyme.mount(
    <Provider store={mockStore}>
      <BrowserRouter>
        <AlbumDetail match={match}/>
      </BrowserRouter>
    </Provider>
  );

  beforeEach(() => {
    jest.spyOn(Router, 'useLocation').mockReturnValue(mockLocation);
  })

  test('Given no albums in state and not loading, dispatches load album action', () => {
    const mockState = createState(match.params.id, 'empty', []);
    const mockStore = configureStore([thunk])(mockState);

    render(mockStore);

    const actions = mockStore.getActions();
    expect(actions).toEqual([getAlbum(match.params.id)]);
  })

  test('Given album not in albums state and not loading, dispatches load album action', () => {
    const mockState = createState(
      match.params.id,
      'empty',
      [createAlbum(`not_${match.params.id}`, [], [])]
    );
    const mockStore = configureStore([thunk])(mockState);

    render(mockStore);

    const actions = mockStore.getActions();
    expect(actions).toEqual([getAlbum(match.params.id)]);
  })

  test('Given no albums in state and loading, renders message', () => {
    const mockState = createState(match.params.id, 'loading', []);
    const mockStore = configureStore([thunk])(mockState);

    const result = render(mockStore);

    const actions = mockStore.getActions();
    expect(actions).toEqual([]);
    expect(result.contains(<div>Album not found</div>)).toEqual(true);
  })

  test('Given album in multi-album state, renders album detail', () => {
    const artist = {id: 'artist_id', name: 'artist name'};
    const image = {url: 'url/somewhere'};
    const album = createAlbum(match.params.id, [artist], [image]);
    const mockState = createState(match.params.id, 'loaded', [album]);
    const mockStore = configureStore([thunk])(mockState);

    const result = render(mockStore);

    const actions = mockStore.getActions();
    expect(actions).toEqual([]);
    expect(result.contains(<div>Album not found</div>)).toEqual(false);

    expect(result.contains(<Link to={`/${mockLocation.search}`}>&lt;&lt; back to list</Link>)).toEqual(true);
    expect(result.contains(<h2>{album.name}</h2>)).toEqual(true);
    expect(result.contains(<img src={image.url} alt={`Album artwork`}/>)).toEqual(true);
    expect(result.contains(<ul>{album.artists.map(artist => <li key={artist.id}>{artist.name}</li>)}</ul>)).toEqual(true);
    expect(result.contains(<div>Released on {moment(album.release_date).format('dddd, MMMM Do YYYY')}</div>)).toEqual(true);
    expect(result.contains(<div>{album.total_tracks} tracks</div>)).toEqual(true);
  })

  test('Given album in single-album state, renders album detail', () => {
    const artist = {id: 'artist_id', name: 'artist name'};
    const image = {url: 'url/somewhere'};
    const album = createAlbum(match.params.id, [artist], [image]);
    const mockState = createState(match.params.id, 'loaded', [], album);
    const mockStore = configureStore([thunk])(mockState);

    const result = render(mockStore);

    const actions = mockStore.getActions();
    expect(actions).toEqual([]);
    expect(result.contains(<div>Album not found</div>)).toEqual(false);

    expect(result.contains(<Link to={`/${mockLocation.search}`}>&lt;&lt; back to list</Link>)).toEqual(true);
    expect(result.contains(<h2>{album.name}</h2>)).toEqual(true);
    expect(result.contains(<img src={image.url} alt={`Album artwork`}/>)).toEqual(true);
    expect(result.contains(<ul>{album.artists.map(artist => <li key={artist.id}>{artist.name}</li>)}</ul>)).toEqual(true);
    expect(result.contains(<div>Released on {moment(album.release_date).format('dddd, MMMM Do YYYY')}</div>)).toEqual(true);
    expect(result.contains(<div>{album.total_tracks} tracks</div>)).toEqual(true);
  })

  test('Given album with no image, renders album without image', () => {
    const artist = {id: 'artist_id', name: 'artist name'};
    const album = createAlbum(match.params.id, [artist], []);
    const mockState = createState(match.params.id, 'loaded', [album]);
    const mockStore = configureStore([thunk])(mockState);

    const result = render(mockStore);

    const actions = mockStore.getActions();
    expect(actions).toEqual([]);
    expect(result.contains(<div>Album not found</div>)).toEqual(false);
    expect(result.find('img')).toHaveLength(0);
  })
})