import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// Enable hot reload where available.
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      React.createElement(NextApp),
      document.getElementById('app')
    );
  });
}
