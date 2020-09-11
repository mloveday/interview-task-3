import {albums, AlbumState, clearAlbums, getAlbum, searchAlbums} from "./AlbumState";
import * as SpotifyApi from "../Service/SpotifyApi";

jest.mock('../Service/SpotifyApi')

describe('AlbumState', () => {
  describe('searchAlbums', () => {
    const mockSearchAlbumsResponse = ['foo', 'bar'];
    const mockSearchResponse = () => (SpotifyApi.fetchSearchAlbums as jest.Mock).mockResolvedValue(
      new Promise(resolve => resolve({albums: {href: '', items : mockSearchAlbumsResponse}}))
    );
    const mockEmptySearchResponse = () => (SpotifyApi.fetchSearchAlbums as jest.Mock).mockResolvedValue(
      new Promise(resolve => resolve({}))
    );

    test('dispatches loading action & loaded action on success', () => {
      const expectedSearch = 'expected search';
      const dispatch = jest.fn();
      mockSearchResponse();

      const promise = searchAlbums(expectedSearch)(dispatch);

      expect.assertions(4);
      return promise.then(() => {
        expect(dispatch.mock.calls[0][0].type).toEqual('ALBUMS__LOADING');
        expect(dispatch.mock.calls[0][0].payload.searchTerm).toEqual(expectedSearch);
        expect(dispatch.mock.calls[1][0].type).toEqual('ALBUMS__LOADED');
        expect(dispatch.mock.calls[1][0].payload).toEqual(mockSearchAlbumsResponse);
      });
    })

    test('dispatches loading action & loaded action on empty response', () => {
      const expectedSearch = 'expected search';
      const dispatch = jest.fn();
      mockEmptySearchResponse();

      const promise = searchAlbums(expectedSearch)(dispatch);

      expect.assertions(4);
      return promise.then(() => {
        expect(dispatch.mock.calls[0][0].type).toEqual('ALBUMS__LOADING');
        expect(dispatch.mock.calls[0][0].payload.searchTerm).toEqual(expectedSearch);
        expect(dispatch.mock.calls[1][0].type).toEqual('ALBUMS__LOADED');
        expect(dispatch.mock.calls[1][0].payload).toEqual([]);
      });
    })
  })

  describe('getAlbum', () => {
    const mockAlbumResponse = {foo: 'bar'};
    const mockFetchAlbumResponse = () => (SpotifyApi.fetchAlbum as jest.Mock).mockResolvedValue(
      new Promise(resolve => resolve(mockAlbumResponse))
    );

    test('dispatches loading action & loaded action on success', () => {
      const expectedId = 'expected-id';
      const dispatch = jest.fn();
      mockFetchAlbumResponse();

      const promise = getAlbum(expectedId)(dispatch);

      expect.assertions(4);
      return promise.then(() => {
        expect(dispatch.mock.calls[0][0].type).toEqual('ALBUM__LOADING');
        expect(dispatch.mock.calls[0][0].payload.id).toEqual(expectedId);
        expect(dispatch.mock.calls[1][0].type).toEqual('ALBUM__LOADED');
        expect(dispatch.mock.calls[1][0].payload).toEqual(mockAlbumResponse);
      });
    })
  })

  describe('clearAlbums', () => {
    test('creates action that sets album state to an empty array', () => {
      const result = clearAlbums();

      expect(result.type).toEqual('ALBUMS__LOADED');
      expect(result.payload).toEqual([]);
    })
  })

  describe('albums reducer', () => {
    const initialState: AlbumState = {fetchState: 'loaded', searchTerm: '', albums: [], singleFetchState: 'empty'};

    const getAction = (type: string, payload: any) => ({
      type: type,
      payload: payload,
    });

    test('ALBUMS__LOADING', () => {
      const expectedSearch = 'expected-search';

      const result = albums(initialState, getAction('ALBUMS__LOADING', {searchTerm: expectedSearch, abortController: new AbortController()}));

      expect(result.searchTerm).toEqual(expectedSearch);
      expect(result.fetchState).toEqual('loading');
    })

    test('ALBUMS__LOADED', () => {
      const expectedAlbums = ['foo', 'bar'];

      const result = albums(initialState, getAction('ALBUMS__LOADED', expectedAlbums));

      expect(result.albums).toEqual(expectedAlbums);
      expect(result.abortController).toBeUndefined();
      expect(result.fetchState).toEqual('loaded');
    })

    test('ALBUM__LOADING', () => {
      const expectedId = 'expected-id';

      const result = albums(initialState, getAction('ALBUM__LOADING', {id: expectedId, abortController: new AbortController()}));

      expect(result.singleId).toEqual(expectedId);
      expect(result.singleFetchState).toEqual('loading');
    })

    test('ALBUM__LOADED', () => {
      const expectedAlbum = {foo: 'bar'};

      const result = albums(initialState, getAction('ALBUM__LOADED', expectedAlbum));

      expect(result.album).toEqual(expectedAlbum);
      expect(result.abortController).toBeUndefined();
      expect(result.singleFetchState).toEqual('loaded');
    })

    test('Pass through', () => {
      const result = albums(initialState, {type: 'ANOTHER_ACTION', payload: undefined});

      expect(result).toBe(initialState);
    })

    test('Bootstraps state', () => {
      // @ts-ignore
      const result = albums(undefined, {type: 'INIT', payload: undefined});

      expect(result).toEqual(initialState);
    })
  })
})