import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Utils
import socket from './services/WebsocketService';
import {
  AppContextType,
  AppContextProvider
} from './toolkit/util/AppContext';
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
import './assets/css/reset.css';
import './assets/css/base.css';

// Initialize websocket
const socketURL = process.env.NODE_ENV === 'development'
  ? 'ws://localhost:4004/register'
  : 'ws://shittydj.mantro.services';

socket.setDependencies(socketURL);
socket.open();

const appContext:AppContextType = {
  player: socket.playerState,
};

class App extends Component {
  render() {
    return (
      <Router>
        <AppContextProvider value={appContext}>
          <Route exact path="/" component={HomeRouter}/>
          <Route exact path="/playlist" component={PlaylistRouter}/>
        </AppContextProvider>
      </Router>
    );
  }
}

export default App;
