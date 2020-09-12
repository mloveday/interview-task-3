import * as React from 'react';
import * as Enzyme from 'enzyme';
import {Header} from "./Header";

describe('Header component', () => {
  test('renders h1 element', () => {
    const result = Enzyme.shallow(<Header/>);

    expect(result.find('h1')).toHaveLength(1);
  });
});
