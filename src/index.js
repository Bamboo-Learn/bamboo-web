import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { Mongodb } from './app/helpers/mongodb.js';
import Main from './app/pages/main/Main.js';
import { Login } from './app/pages/login'; // Reset

import * as serviceWorker from './serviceWorker';
import './reset.css';
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
          {/* <Route path="/login/reset">
            <Reset />
          </Route> */}
          <Route path="/login">
            <Login mongodb={this.mongodb} />
          </Route>
          <Route path={["/confirm", "/"]}>
            <Main mongodb={this.mongodb} />
          </Route>
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
