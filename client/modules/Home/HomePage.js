import React from "react";
import { Link } from "react-router";

if (process.env.CLIENT) require("./Home.css");

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1 className="home-title">HOME</h1>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/counter">Counter</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default HomePage;
