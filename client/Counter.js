import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p>Lose the react state when hmr</p>
        <h2>Counter: {this.state.counter}</h2>
      </div>
   );
  }
}

export default Counter;
