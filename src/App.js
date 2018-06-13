import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Creator from './components/Creator';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (localStorage) {
      const user = localStorage.getItem('user');
      console.log('user', user);
      if (user) {
        this.setState({ user: JSON.parse(user) });
      }
    }
  }

  getUser(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.setState({ user });
  }

  logout() {
    localStorage.setItem('user', null);
    this.setState({ user: null });
  }

  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
          <div className="col-xs-9 col-sm-9">
            <h2>{this.state.user ? 'Hi ' + this.state.user.userName + '!' : 'Please login or register'}</h2>
          </div>
          <div className="col-xs-3 col-sm-3">
          <h2>{this.state.user ? <button className="btn btn-default" onClick={this.logout}>Log out</button> : null}</h2>
          </div>
        </div>
        {this.state.user ? <Creator logout={this.logout} user={this.state.user}/> : <Login getUser={this.getUser}/>}
      </div>
    );
  }
}

export default App;
