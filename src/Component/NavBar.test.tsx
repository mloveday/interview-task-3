import * as React from 'react';
import * as Enzyme from 'enzyme';
import {NavBar} from "./NavBar";
import {coverageUrl, githubUrl, homepageUrl} from "../constants";

describe('NavBar component', () => {
  test('renders all link elements', () => {
    const result = Enzyme.shallow(<NavBar/>);

    expect(result.find('Link').find({to: '/'})).toHaveLength(1);
    expect(result.find('Link').find({to: '/credentials'})).toHaveLength(1);
    expect(result.find('a').find({href: githubUrl})).toHaveLength(1);
    expect(result.find('a').find({href: coverageUrl})).toHaveLength(1);
    expect(result.find('a').find({href: homepageUrl})).toHaveLength(1);
  });
});
