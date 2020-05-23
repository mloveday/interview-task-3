import * as React from 'react';
import * as Redux from 'react-redux';
import {AlbumInList} from "./AlbumInList";
import {AppState} from "../Store/store";
import {Toolbar} from "./Toolbar";
import styled from 'styled-components';

const List = styled.ul`
  display: grid;
  list-style: none;
  padding: 0;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`;

export const ListOfAlbums: React.FC = props => {
    const albumState = Redux.useSelector((state: AppState) => state.albums);

    return <div>
        <Toolbar/>
        <List>
            {albumState.albums.map(album => <AlbumInList key={album.id} album={album}/>)}
        </List>
    </div>
};