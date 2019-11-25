// Styles
import './styles/ManageUniversities.css';

import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import Axios from 'axios';

class ManageUniversities extends React.Component {
  state = {
    allRequests: [],
    columns: [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'University',
        accessor: 'university.name'
      },
      { Header: 'Admin', accessor: 'admin.username' },
      {
        accessor: '',
        width: 158,
        Cell: ({ value }) => (
          <Button.Group size='mini'>
            <Button
              positive
              onClick={() => {
                this.onApprove(value);
              }}
            >
              Approve
            </Button>
            <Button.Or />
            <Button
              negative
              onClick={() => {
                this.onReject(value);
              }}
            >
              Reject
            </Button>
          </Button.Group>
        )
      }
    ]
  };

  onApprove = request => {
    Axios.post('http://localhost:8080/rso/add', {
      name: request.name,
      description: request.description,
      admin: request.admin,
      university: request.university
    }).then(res => {
      console.log(res);
    });

    Axios.delete('http://localhost:8080/request/deleteById', {
      params: { id: request.id }
    });

    Axios.put('http://localhost:8080/user/updateRole', {
      role: 'admin',
      username: request.admin.username
    }).then(res => {
      console.log(res);
    });
  };

  onReject = request => {
    Axios.delete('http://localhost:8080/request/deleteById', {
      params: { id: request.id }
    });

    this.forceUpdate();
  };

  componentDidMount() {
    Axios.get('http://localhost:8080/request/getAll').then(res => {
      console.log(res.data);
      this.setState({ allRequests: res.data });
    });
  }

  render() {
    return (
      <div>
        <Header as='h4' attached='top'>
          All RSO Requests
        </Header>
        <Segment attached>
          <ReactTable
            data={this.state.allRequests}
            columns={this.state.columns}
          />
        </Segment>
      </div>
    );
  }
}

export default ManageUniversities;
