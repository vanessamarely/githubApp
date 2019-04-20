import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Registration from './Registration';

describe('Registration', () => {
  it('Renders Registration correctly', () => {
    const component = shallow(<Registration />);
    expect(component).toMatchSnapshot();
  });

  it('input fields render well in a Register form', () => {
    const component = shallow(<Registration />);
    
    const firstNameInput = component.find('input#txtFirstName').at(0);
    expect(firstNameInput.length).toBe(1);

    const lastNameInput = component.find('input#txtLastName');
    expect(lastNameInput.length).toBe(1);
    
    const identificationNumberInput = component.find('input#txtIdentificationNumber');
    expect(identificationNumberInput.length).toBe(1);

    const birthdayInput = component.find('input#txtBirthday');
    expect(birthdayInput.length).toBe(1);

    const emailInput = component.find('input#txtEmail');
    expect(emailInput.length).toBe(1);
    
    const githubUserInput = component.find('input#txtGithubUser');
    expect(githubUserInput.length).toBe(1);

  });
});


