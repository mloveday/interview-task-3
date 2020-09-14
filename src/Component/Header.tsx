import * as React from 'react';
import styled from 'styled-components';

const CompactHeader = styled.header`
  padding-bottom: 0;
`;

export const Header: React.FC = props => <CompactHeader><h1>Interview task: Spotify search</h1></CompactHeader>;