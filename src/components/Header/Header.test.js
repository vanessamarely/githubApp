import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('Renders Header correctly', () => {
    const component = shallow(<Header />);
    expect(component).toMatchSnapshot();
  });
});


