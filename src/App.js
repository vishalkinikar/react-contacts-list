import * as React from 'react';
import './App.css';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/contact/Create';


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
          <Route path={'/create'} exact component={Create} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);