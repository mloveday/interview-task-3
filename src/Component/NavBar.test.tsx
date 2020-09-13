import * as React from 'react';
import * as Enzyme from 'enzyme';
import {NavBar} from "./NavBar";

describe('NavBar component', () => {
  test('renders all link elements', () => {
    const result = Enzyme.shallow(<NavBar/>);

    expect(result.find('Link').find({to: '/'})).toHaveLength(1);
    expect(result.find('Link').find({to: '/credentials'})).toHaveLength(1);
  });
});