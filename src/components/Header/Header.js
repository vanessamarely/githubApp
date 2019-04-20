import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo.svg';
//styles
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }

  componentDidUpdate(prevProps) {
    const { userInfo } = this.props;
    if (this.props.userInfo !== prevProps.userInfo) {
      this.setState({ userInfo });
    }
  }

  render() {
    const { userInfo } = this.state;
    return (
      <section className="header">
        <img alt="Logo" className="header__image" src={logo} />
        {
          userInfo.githubUsername && 
          <div className="header__userInfo">
            <h3 className="header__userInfo__title">{ `Username: ${userInfo.githubUsername}` }</h3>
            <div className="header__userInfo__Details">
              <p className="header__userInfo__subtitle"><strong>Fullname: </strong>{ `${userInfo.firstName} ${userInfo.lastName}` }</p>
              <p className="header__userInfo__subtitle"><strong>Identification #: </strong>{ userInfo.idNumber }</p>              
            </div>
            <div className="header__userInfo__Details">
              <p className="header__userInfo__subtitle email"><strong>Email: </strong>{ userInfo.email }</p>
              <p className="header__userInfo__subtitle"><strong>Birthday: </strong>{  userInfo.birthday }</p>
            </div>
          </div>
        }
      </section>
    );
  }
}

Header.protoTypes = {
  userInfo: PropTypes.object
}

export default Header;
