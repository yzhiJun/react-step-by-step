import React from 'react';
import HelloWorld from './HelloWorld';
import Counter from './Counter';

class App extends React.Component {
  render() {
    return (
      <div>
        <HelloWorld />
        <Counter />
      </div>
    );
  }
}

export default App;
