import React from 'react';
import { IndexLink, Link } from 'react-router';
import Counter from './Counter';

class CounterPage extends React.Component {
  render() {
    return (
      <div>
        <h1>COUNTER</h1>
        <ul>
          <li>
            <IndexLink to="/">Home</IndexLink>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <Counter />
      </div>
    );
  }
}

export default CounterPage;
