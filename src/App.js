import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Creator from './components/Creator'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Creator/>
      </div>
    );
  }
}

export default App;
