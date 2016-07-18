import React from 'react';
import { IndexLink } from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <ul>
          <li>
            <IndexLink to="/">Home</IndexLink>
          </li>
          <li>
            <IndexLink to="/counter">Counter</IndexLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default AboutPage;
