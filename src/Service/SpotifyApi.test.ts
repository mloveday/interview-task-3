import * as Fetch from "../Service/Fetch";
import {fetchAlbum, fetchSearchAlbums} from "./SpotifyApi";

jest.mock('../Service/Fetch')

describe('Service/SpotifyApi', () => {

  beforeEach(() => {
    (Fetch.fetchWithAuth as jest.Mock).mockReset();
  })

  describe('fetchAlbum', () => {
    test('Fetches album', () => {
      const id = 'some-album-id';
      const expectedResult = {foo: 'bar'};
      (Fetch.fetchWithAuth as jest.Mock).mockResolvedValue(Promise.resolve(expectedResult));

      const promise = fetchAlbum(id, new AbortController());

      expect.assertions(2);
      return promise.then(result => {
        expect(result).toEqual(expectedResult);
        expect((Fetch.fetchWithAuth as jest.Mock).mock.calls[0][0]).toEqual(`/v1/albums/${id}`);
      })
    })
  })

  describe('fetchSearchAlbums', () => {
    test('Fetches albums search', () => {
      const query = 'some-query';
      const expectedResult = {foo: 'bar'};
      (Fetch.fetchWithAuth as jest.Mock).mockResolvedValue(Promise.resolve(expectedResult));

      const promise = fetchSearchAlbums(query, new AbortController());

      expect.assertions(2);
      return promise.then(result => {
        expect(result).toEqual(expectedResult);
        expect((Fetch.fetchWithAuth as jest.Mock).mock.calls[0][0]).toEqual(`/v1/search?q=${query}&type=album`);
      })
    })
  })
})