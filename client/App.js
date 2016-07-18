import React from 'react';
import { Router, hashHistory } from 'react-router';
import routes from './routes';

class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        {routes}
      </Router>
    );
  }
}

export default App;
