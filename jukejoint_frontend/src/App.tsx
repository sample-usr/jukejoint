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
import { getWSURL } from './toolkit/util/api';
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
const websocketStream = webSocket<IPlayer>(getWSURL());

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
