import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './HelloWorld';

ReactDOM.render(
  <HelloWorld />,
  document.getElementById('app')
);

// Enable hot reload where available.
if (module.hot) {
  module.hot.accept('./HelloWorld', () => {
    const NextApp = require('./HelloWorld').default;
    ReactDOM.render(
      React.createElement(NextApp),
      document.getElementById('app')
    );
  });
}
