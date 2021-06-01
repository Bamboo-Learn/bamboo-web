import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Mongodb } from 'app/classes';
import { Main, Login, Reset } from 'app/pages';
import { reducer } from 'app/redux';

import * as serviceWorker from './serviceWorker';
import './reset.css';
import './index.css';

const { REACT_APP_ENV } = process.env;
const composeEnhancers = (REACT_APP_ENV === 'PRD') ? compose : composeWithDevTools;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    this.mongodb = Mongodb.init();
  }

  render() {
    // TODO: confirm route popup is popup over <Main>
    return (
      <Router>
        <Provider store={this.store}>
          <Switch>
            <Route path="/login/reset">
              <Reset />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path={["/confirm", "/:pageID", "/"]}>
              <Main />
            </Route>
          </Switch>
        </Provider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
