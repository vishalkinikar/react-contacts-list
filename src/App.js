import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import Home from './components/Home';


class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={'/'}> Home </Link>
            </li>

            <li>
              <Link to={'/create'}> Create Contact </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={'/'} exact component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);