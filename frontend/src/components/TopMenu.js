import React from 'react';
import {
  Menu,
  MenuItem,
  Icon,
  Modal,
  Button,
  Image,
  Card,
  Tab,
  Form,
  Dropdown,
  Message
} from 'semantic-ui-react';

import './TopMenu.css';
import Axios from 'axios';

class TopMenu extends React.Component {
  state = {
    modalOpen: false,
    allUniversities: null,
    username: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    phoneNumber: undefined,
    university: undefined
  };

  componentDidMount() {
    Axios.get('http://localhost:8080/university/getAll').then(res => {
      this.setState({
        allUniversities: res.data.map(university => {
          return {
            key: university.id,
            text: university.name,
            value: university.name
          };
        })
      });
    });
  }

  onModalClick = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onLogOut = () => {
    this.props.setUser(null);
    this.props.getUser();
  };
  onLogIn = () => {
    Axios.post('http://localhost:8080/user/login', {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      if (res.data) {
        this.props.setUser(res.data);
        this.setState({ modalOpen: false });
      } else {
        this.setState({ logInError: true });
      }
    });
  };

  onSubmit = () => {
    console.log(this.state);
    Axios.post('http://localhost:8080/contact/add', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phoneNo: this.state.phoneNumber
    }).then(res => {
      console.log(res);
      Axios.post('http://localhost:8080/user/add', {
        username: this.state.username,
        password: this.state.password,
        contact: res.data,
        university: this.state.university
      });
    });
  };

  onChangeUsername = (e, { value }) => {
    this.setState({ username: value });
  };
  onChangePassword = (e, { value }) => {
    this.setState({ password: value });
  };
  onChangeFirstName = (e, { value }) => {
    this.setState({ firstName: value });
  };
  onChangeLastName = (e, { value }) => {
    this.setState({ lastName: value });
  };
  onChangeEmail = (e, { value }) => {
    this.setState({ email: value });
  };
  onChangePhoneNumber = (e, { value }) => {
    this.setState({ phoneNumber: value });
  };

  onSelectUniversity = (e, data) => {
    Axios.get('http://localhost:8080/university/getByName', {
      params: { name: data.value }
    }).then(res => {
      this.setState({ university: res.data });
    });
  };

  render() {
    let modal;
    let user = this.props.getUser();
    if (user !== null) {
      modal = (
        <Modal open={this.state.modalOpen} onClose={this.onModalClick}>
          <Modal.Header>Profile</Modal.Header>
          <Modal.Content image scrolling>
            <Card>
              <Image src={user.profileImageURL} wrapped ui={false} />
              <Card.Content>
                <Card.Header>
                  {user.contact.firstName} {user.contact.lastName}
                  <div className='username' inline>
                    @{user.username}
                  </div>
                </Card.Header>
                <Card.Meta>{user.university.name}</Card.Meta>
                <Card.Description>
                  {user.contact.firstName} {user.contact.lastName} is a{' '}
                  {user.role}.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name='mail' />
                {user.contact.email}
                <br />
                <Icon name='phone' />
                {user.contact.phoneNo}
              </Card.Content>
            </Card>

            <Modal.Description>AS;DLKAS;LDKAS;LDK </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button attached onClick={this.onLogOut}>
              Sign Out
            </Button>
          </Modal.Actions>
        </Modal>
      );
    } else {
      const panes = [
        {
          menuItem: 'Sign In',
          render: () => {
            return (
              <div>
                <Tab.Pane attached={false}>
                  <Form>
                    <Form.Input
                      fluid
                      label='Username'
                      onChange={this.onChangeUsername}
                      onClick={() => {
                        this.setState({ logInError: false });
                      }}
                    />
                    <Form.Input
                      fluid
                      label='Password'
                      onChange={this.onChangePassword}
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
        },
        {
          menuItem: 'Sign Up',
          render: () => {
            return (
              <div>
                <Tab.Pane attached={false}>
                  <Form>
                    <Form.Input
                      required
                      fluid
                      label='Username'
                      onChange={this.onChangeUsername}
                      value={this.state.username}
                    />
                    <Form.Input
                      type='password'
                      required
                      fluid
                      label='Password'
                      onChange={this.onChangePassword}
                      value={this.state.password}
                    />
                    <Form.Group widths='equal'>
                      <Form.Input
                        fluid
                        label='First Name'
                        onChange={this.onChangeFirstName}
                        value={this.state.firstName}
                      />
                      <Form.Input
                        fluid
                        label='Last Name'
                        onChange={this.onChangeLastName}
                        value={this.state.lastName}
                      />
                    </Form.Group>
                    <Form.Group widths='equal'>
                      <Form.Input
                        required
                        fluid
                        label='Email'
                        onChange={this.onChangeEmail}
                        value={this.state.email}
                      />
                      <Form.Input
                        required
                        fluid
                        label='Phone Number'
                        onChange={this.onChangePhoneNumber}
                        value={this.state.phoneNumber}
                      />
                    </Form.Group>
                    <Form.Input label='University'>
                      <Dropdown
                        fluid
                        required
                        onChange={this.onSelectUniversity}
                        selection
                        search
                        options={this.state.allUniversities}
                      />
                    </Form.Input>
                    <Form.Button type='submit' fluid onClick={this.onSubmit}>
                      Submit
                    </Form.Button>
                  </Form>
                </Tab.Pane>
              </div>
            );
          }
        }
      ];
      modal = (
        <Modal
          size='small'
          open={this.state.modalOpen}
          onClose={this.onModalClick}
        >
          <Modal.Content>
            <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
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
