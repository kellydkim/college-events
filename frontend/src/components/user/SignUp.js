// Styles
import './styles/Tab.css';

import React from 'react';
import { Form, Tab, Dropdown } from 'semantic-ui-react';
import Axios from 'axios';

class SignUp extends React.Component {
  state = {
    allUniversities: null,
    username: this.props.state.username,
    password: this.props.state.password,
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
            key: university.name,
            text: university.name,
            value: university.name
          };
        })
      });
    });
  }

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
        username: this.props.state.username,
        password: this.props.state.password,
        contact: res.data,
        university: this.state.university
      }).then(res => {
        console.log(res);
      });
    });
    this.props.onModalClick();
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
    return (
      <div>
        <Tab.Pane attached={false}>
          <Form>
            <Form.Input
              required
              fluid
              label='Username'
              onChange={this.props.setUsername}
              value={this.props.state.username}
            />
            <Form.Input
              type='password'
              required
              fluid
              label='Password'
              onChange={this.props.setPassword}
              value={this.props.state.password}
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

export default SignUp;
