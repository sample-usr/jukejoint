import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { webSocket } from 'rxjs/webSocket';

// Utils
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
import { Loading } from './pod/loading';
import { FourOuFour } from './pod/fourOuFour';
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
      appContext: {
        player: undefined,
        loading: false,
        setLoading: this.setIsLoading,
      }
    }
    websocketStream.subscribe((playerObj: IPlayer) =>
      this.setState({ appContext: { player: playerObj, loading: false, setLoading: this.setIsLoading } }));
  }

  private setIsLoading = (loading: boolean) => {
    this.setState({ appContext: { ...this.state.appContext, loading } });
  }

  render() {
    console.log(this.state.appContext);
    return (
      <Router>
        <AppContextProvider value={this.state.appContext}>
          <Loading isVisible={this.state.appContext.loading} />
          <Switch>
            <Route exact path="/" component={HomeRouter} />
            <Route exact path="/playlist" component={PlaylistRouter} />
            <Route component={FourOuFour} />
          </Switch>
        </AppContextProvider>
      </Router>
    );
  }
}

export default App;
