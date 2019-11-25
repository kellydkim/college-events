// Styles
import './styles/BrowseRSOs.css';

import React from 'react';
import { Header, Segment, Icon, Modal, Button } from 'semantic-ui-react';
import ReactTable from 'react-table';
import Axios from 'axios';

class BrowseRSOs extends React.Component {
  state = {
    allRSOs: [],
    columns: [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Admin', accessor: 'admin.username' },
      {
        Header: 'Active',
        accessor: 'members',
        Cell: ({ value }) => {
          if (value.length > 5) {
            return <Icon name='checkmark' color='green' />;
          } else return <Icon name='x' color='red' />;
        },
        width: 60,
        className: 'tableIcon'
      },
      {
        Header: 'Join',
        accessor: '',
        Cell: ({ value }) => {
          console.log(value);
          return (
            <Icon
              name='check'
              link
              onClick={() => {
                this.setState({ modalOpen: true, modalRSO: value });
              }}
            />
          );
        },
        width: 60,
        className: 'tableIcon'
      }
    ],
    modalOpen: false,
    modalRSO: null
  };

  onJoinRSO = () => {
    Axios.post('http://localhost:8080/rso/addMember', {
      rso: this.state.modalRSO.id,
      rsoMember: this.props.getUser().username
    });
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onSelectJoin = () => {
    return (
      <div>
        <Modal open={this.state.modalOpen}>
          <Modal.Content>
            Would you like to join {this.state.modalRSO.name}
          </Modal.Content>
          <Modal.Actions>
            <Button.Group>
              <Button positive onClick={this.onJoinRSO}>
                Yes
              </Button>
              <Button
                negative
                onClick={() =>
                  this.setState({ modalOpen: !this.state.modalOpen })
                }
              >
                No
              </Button>
            </Button.Group>
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  componentDidMount() {
    Axios.get('http://localhost:8080/rso/getAll').then(res => {
      console.log(res.data);
      this.setState({ allRSOs: res.data });
    });
  }

  render() {
    return (
      <div>
        <Header as='h4' attached='top'>
          Browse RSO's
        </Header>
        <Segment attached>
          <ReactTable data={this.state.allRSOs} columns={this.state.columns} />
        </Segment>
        {this.state.modalRSO ? this.onSelectJoin() : null}
      </div>
    );
  }
}

export default BrowseRSOs;
