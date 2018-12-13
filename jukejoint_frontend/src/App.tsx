import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { webSocket } from 'rxjs/webSocket';

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
import { IPlayer } from '@jukejoint/common/lib/interfaces';
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
  : 'ws://dj.mantro.services:4004/register';

const websocketStream = webSocket<IPlayer>(socketURL);

// socket.setDependencies(socketURL);
// socket.open();
type State = {
  appContext: AppContextType
}
class App extends Component<{}, State> {
  constructor(props:{}) {
    super(props);
    this.state = {
      appContext: { player: undefined }
    }
    websocketStream.subscribe((playerObj:IPlayer) => this.setState({ appContext: { player : playerObj }}));
  }

  render() {
    return (
      <Router>
        <AppContextProvider value={this.state.appContext}>
          <Route exact path="/" component={HomeRouter}/>
          <Route exact path="/playlist" component={PlaylistRouter}/>
        </AppContextProvider>
      </Router>
    );
  }
}

export default App;
