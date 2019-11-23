// Styles
import './styles/CreateEvents.css';

import React from 'react';
import { Segment, Form, Button, Dropdown } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import Axios from 'axios';

// Components
import MapsAutoComplete from '../MapsAutoComplete';

const api = 'http://localhost:8080/';

class CreateEvents extends React.Component {
  state = {
    name: undefined,
    description: undefined,
    start: '',
    end: '',
    privacy: '',
    contact: '',
    rso: '',
    googlePlaceId: '',
    allContacts: [],
    allRSOs: []
  };

  componentDidMount() {
    Axios.get(`${api}contact/getAll`).then(res => {
      this.setState({
        allContacts: res.data.map(contact => {
          return {
            key: contact.id,
            text: contact.email,
            value: contact.email
          };
        })
      });
    });
    Axios.get(`${api}rso/getAll`).then(res => {
      this.setState({
        allRSOs: res.data.map(rso => {
          return { key: rso.id, text: rso.name, value: rso.name };
        })
      });
    });
  }

  onSubmit = () => {
    console.log(this.state);
    Axios.post(`${api}event/add`, {
      name: this.state.name,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      privacyLevel: this.state.privacy,
      googlePlaceId: this.state.googlePlaceId,
      rso: this.state.rso,
      contact: this.state.contact
    });
  };

  onSelectContact = (e, data) => {
    Axios.get(`${api}contact/getByEmail`, {
      params: { email: data.value }
    }).then(res => {
      this.setState({ contact: res.data });
    });
  };

  onSelectRso = (e, data) => {
    Axios.get(`${api}rso/getByName`, {
      params: { name: data.value }
    }).then(res => {
      this.setState({ rso: res.data });
    });
  };

  onChangeName = (e, { value }) => this.setState({ name: value });

  onSelectStartDate = (e, { name, value }) => {
    console.log(value);
    this.setState({ start: value });
  };

  onSelectEndDate = (e, { name, value }) => this.setState({ end: value });

  onSelectPrivacy = (e, { value }) => this.setState({ privacy: value });

  onChangeDescription = (e, { value }) => this.setState({ description: value });

  onSelectLocation = googlePlaceId => {
    this.setState({ googlePlaceId });
  };

  render() {
    const newEvent = this.state;
    console.log(this.state.allContacts);

    return (
      <div>
        <Segment>
          <Form>
            <Form.Group>
              <Form.Input
                width={12}
                label='Event Name'
                onChange={this.onChangeName}
              />
              <DateTimeInput
                dateTimeFormat='YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                value={newEvent.start}
                onChange={this.onSelectStartDate}
                width={4}
                label='Start Time'
              />
              <DateTimeInput
                dateTimeFormat='YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                value={newEvent.end}
                onChange={this.onSelectEndDate}
                width={4}
                label='End Time'
              />
            </Form.Group>
            <Form.Group inline>
              <label>Privacy</label>
              <Form.Radio
                label='Public'
                value='public'
                checked={newEvent.privacy === 'public'}
                onChange={this.onSelectPrivacy}
              />
              <Form.Radio
                label='Private'
                value='private'
                checked={newEvent.privacy === 'private'}
                onChange={this.onSelectPrivacy}
              />
              <Form.Radio
                label='RSO Event'
                value='rso event'
                checked={newEvent.privacy === 'rso event'}
                onChange={this.onSelectPrivacy}
              />
            </Form.Group>
            <Form.TextArea
              label='Description'
              onChange={this.onChangeDescription}
            />
            <Form.Group widths='equal'>
              <Form.Input label='Contact Information'>
                <Dropdown
                  fluid
                  onChange={this.onSelectContact}
                  selection
                  search
                  options={this.state.allContacts}
                />
              </Form.Input>
              <Form.Input label='Associated RSO'>
                <Dropdown
                  fluid
                  onChange={this.onSelectRso}
                  selection
                  search
                  options={this.state.allRSOs}
                />
              </Form.Input>
            </Form.Group>
            <label>Location</label>
            <MapsAutoComplete handleOnSelect={this.onSelectLocation} />
            <div align='right'>
              <Button type='submit' onClick={this.onSubmit}>
                Submit
              </Button>
            </div>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default CreateEvents;
