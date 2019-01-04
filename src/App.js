import React, { Component } from 'react';
import { Drawer } from './Layout/components/Drawer';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <header className="App-header">
            <Drawer />
            <Routes />
          </header>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
