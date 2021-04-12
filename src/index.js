import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { Mongodb } from './app/helpers/mongodb.js';
import Main from './app/components/main/Main.js';
import { Login, Reset } from './app/components/login';

import * as serviceWorker from './serviceWorker';
import './index.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.mongodb = new Mongodb();
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* TODO: <Route path="/login/confirm" component={Confirm} /> */}
          <Route path="/login/reset" component={Reset} />
          <Route path="/login" render={(props) => (<Login mongodb={this.mongodb} />)} />
          <Route path={["/confirm", "/"]} render={(props) => (<Main mongodb={this.mongodb} />)} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
