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
      <div className="App container">
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <h2>{this.state.user ? 'Hi ' + this.state.user.userName + '!' : 'Please login or register'}</h2>
          </div>
        </div>
        {this.state.user ? <Creator logout={this.logout} user={this.state.user}/> : <Login getUser={this.getUser}/>}
      </div>
    );
  }
}

export default App;
