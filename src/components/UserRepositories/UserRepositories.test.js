import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import UserRepositories from './UserRepositories';

describe('UserRepositories', () => {
  it('Renders UserRepositories correctly', () => {
    const component = shallow(<UserRepositories />);
    expect(component).toMatchSnapshot();
  });
});


