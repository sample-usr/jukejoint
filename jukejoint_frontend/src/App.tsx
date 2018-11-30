import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
