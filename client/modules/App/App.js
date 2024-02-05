import React, { PropTypes } from "react";

if (process.env.CLIENT) require("./App.css");

class App extends React.Component {
  render() {
    return <div className="container">{this.props.children}</div>;
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
