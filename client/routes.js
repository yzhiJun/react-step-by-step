import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./modules/App/App";
import Home from "./modules/Home/HomePage";
import About from "./modules/About/AboutPage";
import Counter from "./modules/Counter/CounterPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="about" component={About} />
    <Route path="counter" component={Counter} />
  </Route>
);
