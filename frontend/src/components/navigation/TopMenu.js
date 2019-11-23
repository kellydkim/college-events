// Styles
import './styles/TopMenu.css';

import React from 'react';
import {
  Menu,
  MenuItem,
  Icon,
  Modal,
  Tab,
  Image,
  Header,
  Card,
  Button
} from 'semantic-ui-react';
import Axios from 'axios';

// Components
import Profile from '../user/Profile';
import SignIn from '../user/SignIn';
import SignUp from '../user/SignUp';

class TopMenu extends React.Component {
  state = {
    modalOpen: false,
    username: undefined,
    password: undefined
  };

  onModalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onChangeUsername = (e, { value }) => {
    this.setState({ username: value });
  };

  onChangePassword = (e, { value }) => {
    this.setState({ password: value });
  };

  render() {
    let modal;
    let user = this.props.getUser();

    if (user !== null) {
      modal = (
        <Profile
          modalOpen={this.state.modalOpen}
          onModalClick={this.onModalClick}
          getUser={this.props.getUser}
          setUser={this.props.setUser}
        />
      );
    } else {
      modal = (
        <Modal
          dimmer='blurring'
          open={this.state.modalOpen}
          onClose={this.onModalClick}
        >
          <Modal.Content>
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={[
                {
                  menuItem: 'Sign In',
                  render: () => {
                    return (
                      <SignIn
                        setUsername={this.onChangeUsername}
                        setPassword={this.onChangePassword}
                        state={this.state}
                        setUser={this.props.setUser}
                      />
                    );
                  }
                },
                {
                  menuItem: 'Sign Up',
                  render: () => {
                    return (
                      <SignUp
                        setUsername={this.onChangeUsername}
                        setPassword={this.onChangePassword}
                        state={this.state}
                        setUser={this.props.setUser}
                      />
                    );
                  }
                }
              ]}
            />
          </Modal.Content>
        </Modal>
      );
    }
    return (
      <div>
        <Menu
          borderless
          attached='top'
          style={{ margin: 0, borderWidth: '0 0 1px 0' }}
        >
          <MenuItem position='right'>
            <Icon link name='user circle outline' onClick={this.onModalClick} />
          </MenuItem>
        </Menu>
        {modal}
      </div>
    );
  }
}

export default TopMenu;
