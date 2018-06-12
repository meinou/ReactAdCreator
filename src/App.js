import React, { Component } from 'react';
import './App.css';
import Login from './components/Login';
import Creator from './components/Creator'

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
    this.getUser = this.getUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUser(user) {
    console.log("in getu", user);
    this.setState({ user });
  }

  logout() {
    this.setState({user: null});
  }

  render() {
    return (
      
      <div className="App">
      {!this.state.user ? <Login getUser={this.getUser}/> : <button className="btn btn-info logout" onClick={this.logout}>Log out</button>}
      {!this.state.user ? <h2>Please login or register</h2> : <Creator user={this.state.user}/>}
      </div>
    );
  }
}

export default App;
