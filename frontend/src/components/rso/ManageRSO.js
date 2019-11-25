import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import Axios from 'axios';
import ReactTable from 'react-table';

class ManageRSOs extends React.Component {
  state = {
    allRSOs: [],
    columns: [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' }
    ]
  };

  componentDidMount() {
    Axios.get('http://localhost:8080/rso/getByAdmin', {
      params: { admin: this.props.getUser().username }
    }).then(res => {
      console.log(res.data);
      this.setState({ allRSOs: res.data });
    });
  }

  render() {
    return (
      <div>
        <Header attached='top' as='h4'>
          Manage RSO's
        </Header>
        <Segment attached>
          <ReactTable data={this.state.allRSOs} columns={this.state.columns} />
        </Segment>
      </div>
    );
  }
}

export default ManageRSOs;
