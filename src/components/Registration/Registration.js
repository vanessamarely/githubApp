import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
//styles
import './Registration.scss';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: "",
        lastName: "",
        idNumber: "",
        birthday: "",
        email: "",
        githubUsername: ""
      }
    };
    this.form = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  validate = () => {
    return this.form.current.reportValidity();
  }

  onChangeDataForm = (event, fieldName) => {
    const field = event.target.value;
    const form = { ...this.state.form };
    form[fieldName]= field;
    this.setState({ form });
  }

  submitUserInfo = () => {
    if(this.validate()){
      const { history } = this.props;
      const { form } = this.state;
      cookie.save('userInfo', form, { path: '/' });
      history.push('/repos');
      this.getUserInfo(form);
    }
  }

  getUserInfo = (data) => {
    this.props.getData(data);
  }

  render() {
    return (
      <section className="register" id="register">
        <form ref={this.form} className="form register__form" id="registerForm" onSubmit={this.onSubmit}>
          <div className="form-group inputContainer">
            <label htmlFor="txtFirstName" className="inputContainer__label">
              First Name
            </label>  
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fas fa-address-card"></i></div>
              </div>
              <input className="form-control inputContainer__text" type="text" id="txtFirstName" name="firstName" placeholder="Enter your First Name" onChange={(e)=> this.onChangeDataForm(e, 'firstName')} required/>
            </div>
          </div>
          <div className="form-group inputContainer">
            <label htmlFor="txtLastName" className="inputContainer__label">
              Last Name
            </label>  
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fas fa-address-card"></i></div>
              </div>
              <input className="form-control inputContainer__text" type="text" id="txtLastName" name="lastName" placeholder="Enter your Last Name" onChange={(e)=> this.onChangeDataForm(e, 'lastName')} required/>
            </div>
          </div>
          <div className="form-group inputContainer">
            <label htmlFor="txtIdentificationNumber" className="inputContainer__label">
              Identification Number
            </label>  
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text">#</div>
              </div>
              <input className="form-control inputContainer__text" type="number" id="txtIdentificationNumber" name="idNumber" placeholder="Enter your Id Number" onChange={(e)=> this.onChangeDataForm(e, 'idNumber')} required/>
            </div>
          </div>
          <div className="form-group inputContainer">
            <label htmlFor="txtBirthday" className="inputContainer__label">
              Date of birth
            </label> 
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fas fa-birthday-cake"></i></div>
              </div>
              <input className="form-control inputContainer__text" type="date" id="txtBirthday" name="birthday" placeholder="Enter your Id Number" onChange={(e)=> this.onChangeDataForm(e, 'birthday')} required/>
            </div> 
          </div>
          <div className="form-group inputContainer">
            <label htmlFor="txtEmail" className="inputContainer__label">
              Email address
            </label> 
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fas fa-envelope"></i></div>
              </div>
              <input className="form-control inputContainer__text" type="email" id="txtEmail" name="email" placeholder="Enter your email" onChange={(e)=> this.onChangeDataForm(e, 'email')} required/>
            </div>
          </div>
          <div className="form-group inputContainer">
            <label htmlFor="txtGithubUser" className="inputContainer__label">
              Github User Name
            </label>  
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text"><i className="fab fa-github"></i></div>
              </div>
              <input className="form-control inputContainer__text" type="text" id="txtGithubUser" name="githubUsername" placeholder="Enter GithubUser" onChange={(e)=> this.onChangeDataForm(e, 'githubUsername')} required/>
            </div>
          </div>
          <div className="form-group buttonContainer" id="registerButtonContainer">
            <button className="btn btn-primary buttonContainer__button" type="button" id="registerButton" onClick={this.submitUserInfo}>
              <i className="fas fa-paper-plane buttonContainer__button__icon" id="registerIconButton"></i> 
              <span>Submit</span>
            </button>
          </div>
        </form>
      </section>
      
    );
  }
}

Registration.protoTypes = {
  getData: PropTypes.func,
  history: PropTypes.object
}

export default Registration;
