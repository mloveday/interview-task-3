import * as queryString from 'query-string';
import {Album} from "../Model/Album";
import {fetchWithAuth} from "./Fetch";

export const fetchSearchAlbums = (term: string, abortController: AbortController): Promise<{
  albums: {
    href: string,
    items: Album[]
  }
}> => {
  const queryParams = {
    q: term,
    type: 'album',
  };
  return fetchWithAuth(`/v1/search?${queryString.stringify(queryParams)}`, abortController);
}

export const fetchAlbum = (id: string, abortController: AbortController): Promise<Album> => fetchWithAuth(`/v1/albums/${id}`, abortController);
