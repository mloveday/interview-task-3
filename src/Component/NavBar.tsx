import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import {coverageUrl, githubUrl, homepageUrl} from "../constants";

const CompactNav = styled.nav`
  margin-bottom: 1rem;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  li {
    display: block;
    margin: 0;
    padding: 0.2rem;
    background: white;
  }
  
  a {
    color: #00468b;
    background: #f8f8f8;
    padding: 0.4rem 0.8rem;
    border-radius: 0.2rem;
    &:hover {
      color: #0060be;
      background: #eee;
      filter: none;
    }
  }
`;

export const NavBar: React.FC = props => {
    return <CompactNav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/credentials'>Client credentials</Link></li>
            <li><a href={githubUrl} target='_blank'>
                Github repo <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a></li>
            <li><a href={coverageUrl} target='_blank'>
                Code coverage <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a></li>
            <li><a href={homepageUrl} target='_blank'>
                MilesLoveday.com <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a></li>
        </ul>
    </CompactNav>
};