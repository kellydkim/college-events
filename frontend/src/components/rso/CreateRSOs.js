// Styles
import './styles/CreateRSOs.css';

import React from 'react';
import { Form, Segment, Dropdown, Header } from 'semantic-ui-react';
import Axios from 'axios';

class CreateRSOs extends React.Component {
  state = {
    user: this.props.getUser(),
    allUsers: null,
    admin: null,
    description: undefined
  };

  componentDidMount() {
    Axios.get('http://localhost:8080/user/getAll').then(res => {
      this.setState({
        allUsers: res.data.map(user => {
          return {
            key: user.id,
            text: user.contact.email,
            value: user.username
          };
        })
      });
    });
  }

  onSelectUser = (e, data) => {
    Axios.get('http://localhost:8080/user/getByUsername', {
      params: { name: data.value }
    }).then(res => {
      this.setState({ admin: res.data });
    });
  };

  onChangeName = (e, { value }) => this.setState({ name: value });

  onChangeDescription = (e, { value }) => this.setState({ description: value });

  onSubmit = () => {
    console.log(this.state.user);
    Axios.post('http://localhost:8080/request/add', {
      name: this.state.name,
      description: this.state.description,
      admin: this.state.admin,
      university: this.state.user.university
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <Header as='h4' attached='top'>
          Create RSO
        </Header>
        <Segment attached>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Name' onChange={this.onChangeName} />
              <Form.Input fluid label='Admin'>
                <Dropdown
                  fluid
                  onChange={this.onSelectUser}
                  selection
                  search
                  options={this.state.allUsers}
                />
              </Form.Input>
            </Form.Group>
            <Form.TextArea
              label='Description'
              onChange={this.onChangeDescription}
            />
            <div align='right'>
              <Form.Button onClick={this.onSubmit}>Submit</Form.Button>
            </div>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default CreateRSOs;
