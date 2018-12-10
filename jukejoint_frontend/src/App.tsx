import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { instance as WebSocketInstance } from './services/WebsocketService';
import { PlayerService } from './services/PlayerService';

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
WebSocketInstance.setDependencies(socketURL);
WebSocketInstance.open(PlayerService.getInstance().getCurrentState);

class App extends Component {

  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path="/" component={HomeRouter} />
          <Route exact path="/playlist" component={PlaylistRouter} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
