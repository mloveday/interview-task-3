import 'jsdom-global/register';
import * as React from 'react';
import * as Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {ListOfAlbums} from "./ListOfAlbums";
import thunk from 'redux-thunk';
import {AlbumInList} from "./AlbumInList";

jest.mock('../Store/AlbumState')

describe('ListOfAlbums component', () => {

  const createAlbum = (id, artists, images) => ({
    id,
    name: 'foobar',
    artists: artists,
    release_date: '2020-09-08',
    total_tracks: 5,
    images: images,
  })

  const createState = (albums) => ({
    albums: {
      fetchState: 'loaded',
      albums,
    }
  })

  const render = (mockStore) => Enzyme.mount(
    <Provider store={mockStore}>
      <BrowserRouter>
        <ListOfAlbums />
      </BrowserRouter>
    </Provider>
  );

  test('renders list from state', () => {
    const albums = [
      createAlbum('id-1', [], []),
      createAlbum('id-2', [], []),
      createAlbum('id-3', [], []),
    ];
    const mockState = createState(albums);
    const mockStore = configureStore([thunk])(mockState);

    const result = render(mockStore);


    albums.forEach(album => {
      expect(result.find(AlbumInList).find({album: album})).toHaveLength(1);
    })
  });
});