import React, {  Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookies';
//components
import Header from '../Header/Header';
import Registration from '../Registration/Registration';
import UserRepositories from '../UserRepositories/UserRepositories';
//styles
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state= {
      userInfo : {}
    }
  }

  componentDidMount() {
    const userInfo = cookie.load('userInfo');
    if(userInfo && userInfo.githubUsername){
      this.setState({
        userInfo 
      })
    }
  }

  getUserInfo(params) {
    this.setState({
      userInfo : params
    });
  }

  clearInfo(){
    this.setState({
      userInfo : {}
    })
  }

  render() {
    const { userInfo } = this.state;
    return (
      <Router>
        <Header userInfo={userInfo} />
        <Switch>
          <Route exact path="/" render={(props) => <Registration {...props} getData={this.getUserInfo.bind(this)} />} />
          <Route path="/repos" render={(props) => <UserRepositories {...props} clear={this.clearInfo.bind(this)} />} />
        </Switch>
      </Router>
    );
  }
  
}

export default App;
