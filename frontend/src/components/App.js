import React from 'react';
import SideMenu from './SideMenu';
import TopMenu from './TopMenu';
import BrowseEvents from './BrowseEvents';
import Home from './Home';
import CreateEvents from './CreateEvents';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import CreateUniversities from './CreateUniversities';

class App extends React.Component {
  state = {
    user: null
  };

  getUser = () => {
    console.log(this.state.user);
    return this.state.user;
  };

  setUser = user => {
    console.log('success', user);
    this.setState({ user });
  };

  render() {
    return (
      <Router>
        <div
          style={{ backgroundColor: 'rgba(239,240,244,.2)', height: '100%' }}
        >
          <TopMenu getUser={this.getUser} setUser={this.setUser} />
          <SideMenu />
          <div id='safearea'>
            <Switch>
              <Route
                exact
                path='/event/view'
                component={() => (
                  <BrowseEvents getUser={this.getUser} setUser={this.setUser} />
                )}
              />
              <Route
                exact
                path='/event/create'
                component={() => (
                  <CreateEvents getUser={this.getUser} setUser={this.setUser} />
                )}
              />
              <Route
                exact
                path='/university/create'
                component={() => (
                  <CreateUniversities
                    getUser={this.getUser}
                    setUser={this.setUser}
                  />
                )}
              />
              <Route exact path='/' component={Home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
