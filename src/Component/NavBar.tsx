import * as React from 'react';
import { Link } from 'react-router-dom';

export const NavBar: React.FC = props => {
    return <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/credentials'>Client credentials</Link></li>
        </ul>
    </nav>
};