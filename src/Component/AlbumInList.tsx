import * as React from 'react';
import {Album} from "../Model/Album";
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';

const Thumbnail = styled.img`
  width: 100%;
`;

const LinkContents = styled.div`
  display: grid;
  grid-gap: 8px;
`;

export const AlbumInList: React.FC<{album: Album}> = props => {
    const location = useLocation();

    const image = props.album.images.length > 0 ? props.album.images[0] : undefined;

    return <li>
        <Link to={`/album/${props.album.id}${location.search}`}>
            <LinkContents>
                {image !== undefined && <Thumbnail src={image.url} alt={`Album art for ${props.album.name}`}/>}
                <div>{props.album.name}</div>
                <div>{props.album.artists.map(artist => artist.name).join(', ')}</div>
            </LinkContents>
        </Link>
    </li>
};