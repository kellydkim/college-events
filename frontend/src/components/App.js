// Styles
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Home from './Home';
import SideMenu from './navigation/SideMenu';
import TopMenu from './navigation/TopMenu';
import BrowseEvents from './event/BrowseEvents';
import CreateEvents from './event/CreateEvents';
import CreateUniversities from './university/CreateUniversities';
import ManageUniversities from './university/ManageUniversities';
import ManageRSOs from './rso/ManageRSO';
import CreateRSOs from './rso/CreateRSOs';
import BrowseRSOs from './rso/BrowseRSOs';

class App extends React.Component {
  state = {
    user: {
      id: 1,
      username: 'kellydkim',
      password: '$2a$10$ilOlp3mM6qAUIUxYBU24HezkkeZ/7Ta8SeOTLPv7mpMgY5Ve9MZf6',
      profileImageURL:
        'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png',
      role: 'student',
      contact: {
        id: 2,
        firstName: 'Kelly',
        lastName: 'Kim',
        email: 'kellydkim@gmail.com',
        phoneNo: '239-745-1767'
      },
      university: {
        id: 1,
        name: 'University of Central Florida',
        googlePlaceId: 'ChIJZ9k0fGBo54gRMENVJ4UT2kM',
        description:
          'The University of Central Florida is a state university in Orlando, Florida. It has more students enrolled on campus than any other U.S. university',
        noOfStudents: null,
        imageURL: 'https://www.ucf.edu/news/files/2019/02/UCF-Millican-Hall.jpg'
      },
      rsos: []
    }
  };

  getUser = () => {
    return this.state.user;
  };

  setUser = user => {
    this.setState({ user });
  };

  render() {
    return (
      <Router>
        <div
          style={{ backgroundColor: 'rgba(239,240,244,.2)', height: '100%' }}
        >
          <TopMenu getUser={this.getUser} setUser={this.setUser} />
          <SideMenu getUser={this.getUser} setUser={this.setUser} />
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
                path='/rso/browse'
                component={() => (
                  <BrowseRSOs getUser={this.getUser} setUser={this.setUser} />
                )}
              />
              <Route
                exact
                path='/rso/create'
                component={() => (
                  <CreateRSOs getUser={this.getUser} setUser={this.setUser} />
                )}
              />
              <Route
                exact
                path='/rso/manage'
                component={() => (
                  <ManageRSOs getUser={this.getUser} setUser={this.setUser} />
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
              <Route
                exact
                path='/university/manage'
                component={() => (
                  <ManageUniversities
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
