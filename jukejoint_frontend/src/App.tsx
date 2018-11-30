import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import socket from './services/WebsocketService';

import './assets/css/reset.css';
import './assets/css/base.css';

// Utils
// Constants
// Actions
// Models
// Interfaces
// Components
import {
  HomeRouter,
  PlaylistRouter,
} from './routes';
// Styles


const socketURL = process.env.NODE_ENV === 'development' ? 'ws://localhost:4004/register' : 'ws://shittydj.mantro.services';
socket.setDependencies(socketURL);
socket.open();

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeRouter} />
          <Route exact path="/playlist" component={PlaylistRouter} />
        </div>
      </Router>
    );
  }
}

export default App;
