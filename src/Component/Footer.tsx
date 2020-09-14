import * as React from 'react';
import styled from 'styled-components';
import {coverageUrl, githubUrl, homepageUrl} from "../constants";

const CompactFooter = styled.footer`
  padding: 0 1rem 1rem 1rem;
  color: #666;
  font-size: 0.9rem;
`;

export const Footer: React.FC = props => <CompactFooter>
  <h2>What is this?</h2>
  <p>This was an interview task to demonstrate my ability to write a simple SPA in React to fetch and display data from an external API, in this case Spotify.</p>
  <p>I took the basic app I wrote and extended it to include a test suite, I tidied up a few loose ends (still plenty remain, though) and added some CI love including running tests, uploading <a href={coverageUrl}>coverage</a> to Coveralls and building/deploying to Github Pages.</p>
  <p>For more info on the limitations of this, read the <a href={githubUrl}>readme in the repo</a></p>
  <p>Contact details are available at my <a href={homepageUrl}>homepage</a>.</p>
</CompactFooter>;