import * as React from 'react';
import * as Enzyme from 'enzyme';
import {Header} from "./Header";
import {Footer} from "./Footer";
import {coverageUrl, githubUrl, homepageUrl} from "../constants";

describe('Header component', () => {
  test('renders some content', () => {
    const result = Enzyme.shallow(<Footer/>);

    expect(result.find('h2')).toHaveLength(1);
    expect(result.find('a').find({href: githubUrl})).toHaveLength(1);
    expect(result.find('a').find({href: coverageUrl})).toHaveLength(1);
    expect(result.find('a').find({href: homepageUrl})).toHaveLength(1);
  });
});
