import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './app/components/main/Main.js';
import { Login, Reset } from './app/components/login';
import * as serviceWorker from './serviceWorker';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

const routing = (
  <Router>
    <Switch>
      {/* TODO: <Route path="/login/confirm" component={Confirm} /> */}
      <Route path="/login/reset" component={Reset} />
      <Route path="/login" component={Login} />
      <Route path={["/confirm", "/"]} component={Main} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
