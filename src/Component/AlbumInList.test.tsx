import 'jsdom-global/register';
import * as React from 'react';
import Router from 'react-router';
import * as Enzyme from 'enzyme';
import {Link, BrowserRouter} from 'react-router-dom';
import {AlbumInList} from "./AlbumInList";

describe('AlbumInList component', () => {
  const mockLocation = {
    pathname: '',
    hash: '',
    search: '?foo=bar',
    state: '',
  }

  const createAlbum = (id, artists, images) => ({
    id,
    name: 'foobar',
    artists: artists,
    release_date: '2020-09-08',
    total_tracks: 5,
    images: images,
  })

  const render = (album) => Enzyme.mount(
    <BrowserRouter>
      <AlbumInList album={album}/>
    </BrowserRouter>
  );

  beforeEach(() => {
    jest.spyOn(Router, 'useLocation').mockReturnValue(mockLocation);
  })

  test('Renders given album with image', () => {
    const artist = {id: 'artist_id', name: 'artist name'};
    const image = {url: 'url/somewhere'};
    const album = createAlbum('album-id-1', [artist], [image]);

    const result = render(album);

    expect(result.find(Link).find({to: `/album/${album.id}${mockLocation.search}`})).toHaveLength(1);
    expect(result.contains(<div>{album.name}</div>)).toEqual(true);
    expect(result.contains(<div>{album.artists.map(artist => artist.name).join(', ')}</div>)).toEqual(true);
    expect(result.find('img').find({src: image.url, alt: `Album art for ${album.name}`})).toHaveLength(1);
  })

  test('Renders given album without image', () => {
    const artist = {id: 'artist_id', name: 'artist name'};
    const album = createAlbum('album-id-1', [artist], []);

    const result = render(album);

    expect(result.find(Link).find({to: `/album/${album.id}${mockLocation.search}`})).toHaveLength(1);
    expect(result.contains(<div>{album.name}</div>)).toEqual(true);
    expect(result.contains(<div>{album.artists.map(artist => artist.name).join(', ')}</div>)).toEqual(true);
    expect(result.find('img')).toHaveLength(0);
  })
})