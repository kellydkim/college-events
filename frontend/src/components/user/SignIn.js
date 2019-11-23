// Styles
import './styles/Tab.css';

import React from 'react';
import { Tab, Form, Message } from 'semantic-ui-react';
import Axios from 'axios';

class SignIn extends React.Component {
  state = {
    logInError: false,
    username: this.props.state.username,
    password: this.props.state.password
  };

  onLogIn = () => {
    Axios.post('http://localhost:8080/user/login', {
      username: this.props.state.username,
      password: this.props.state.password
    }).then(res => {
      if (res.data) {
        this.props.setUser(res.data);
        this.setState({ modalOpen: false });
      } else {
        this.setState({ logInError: true });
      }
    });

    this.props.onModalClick();
  };

  onChangeUsername = (e, { value }) => {
    this.props.setUsername(e);
    this.setState({ username: value });
  };

  render() {
    return (
      <div>
        <Tab.Pane attached={false}>
          <Form>
            <Form.Input
              fluid
              label='Username'
              value={this.props.state.username}
              onChange={this.props.setUsername}
              onClick={() => {
                this.setState({ logInError: false });
              }}
            />
            <Form.Input
              type='password'
              fluid
              label='Password'
              value={this.props.state.password}
              onChange={this.props.setPassword}
              onClick={() => {
                this.setState({ logInError: false });
              }}
            />
            <Form.Button onClick={this.onLogIn} fluid>
              Enter
            </Form.Button>
          </Form>
          {this.state.logInError ? (
            <Message warning>
              <Message.Header>
                Wrong username and password combination
              </Message.Header>
              <p>Please try again or sign up</p>
            </Message>
          ) : null}
        </Tab.Pane>
      </div>
    );
  }
}

export default SignIn;
