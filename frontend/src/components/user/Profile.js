// Style
import './styles/Profile.css';

import React from 'react';
import { Modal, Card, Image, Icon, Button, Segment } from 'semantic-ui-react';
import Axios from 'axios';

class Profile extends React.Component {
  state = {
    user: this.props.getUser(),
    joinedRSOs: []
  };

  componentDidMount() {
    Axios.get('http://localhost:8080/user/getRsos', {
      params: { username: this.state.user.username }
    }).then(res => {
      this.state.joinedRSOs(res.data);
    });
  }
  onSignOut = () => {
    this.props.setUser(null);
  };

  render() {
    const user = this.state.user;

    return (
      <Modal
        dimmer='blurring'
        open={this.props.modalOpen}
        onClose={this.props.onModalClick}
      >
        <Modal.Header>Profile</Modal.Header>
        <Modal.Content image>
          <Card>
            <Image src={user.profileImageURL} />
            <Card.Content>
              <Card.Header>
                {user.contact.firstName} {user.contact.lastName}
              </Card.Header>
              <Card.Meta>{user.university.name}</Card.Meta>
              <Card.Description>
                {user.contact.firstName} {user.contact.lastName} is a{' '}
                {user.role}.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />
              {user.username}
              <br />
              <Icon name='mail' />
              {user.contact.email}
              <br />
              <Icon name='phone' />
              {user.contact.phoneNo}
            </Card.Content>
          </Card>
          <Modal.Description>
            <Segment>
              {this.state.joinedRSOs.map(rso => {
                <Segment>{rso}</Segment>;
              })}
            </Segment>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button attached onClick={this.onSignOut}>
            Sign Out
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default Profile;
