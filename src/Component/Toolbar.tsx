import * as React from 'react';
import { Link } from 'react-router-dom';

export const Toolbar: React.FC = props => {
    return <div>
        <form>
            <label>
                <span>Search</span>
                <input type='text' />
            </label>
        </form>
    </div>
};