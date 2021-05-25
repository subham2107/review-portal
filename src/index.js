import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './HomePage';
import DetailsPage from './DetailsPage';
import LoginPage from './LoginPage';
import Profile from './Profile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies/:movieId" component={DetailsPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
