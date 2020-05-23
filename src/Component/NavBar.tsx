import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CompactNav = styled.nav`
  margin-bottom: 1rem;
`;

export const NavBar: React.FC = props => {
    return <CompactNav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/credentials'>Client credentials</Link></li>
        </ul>
    </CompactNav>
};