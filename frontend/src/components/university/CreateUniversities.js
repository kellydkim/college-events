import React from 'react';
import { Segment, Form, Header } from 'semantic-ui-react';
import Axios from 'axios';

// Components
import MapsAutoComplete from '../MapsAutoComplete';

class CreateUniversities extends React.Component {
  state = {
    name: undefined,
    description: undefined,
    imageURL: undefined,
    googlePlaceId: undefined
  };

  onSelectLocation = googlePlaceId => {
    console.log(googlePlaceId);
    this.setState({ googlePlaceId });
  };

  onChangeName = (e, { value }) => {
    this.setState({ name: value });
  };

  onChangeDescription = (e, { value }) => {
    this.setState({ description: value });
  };

  onChangeImageURL = (e, { value }) => {
    this.setState({ imageURL: value });
  };

  onSubmit = () => {
    Axios.post('http://localhost:8080/university/add', {
      name: this.state.name,
      description: this.state.description,
      imageURL: this.state.imageURL,
      googlePlaceId: this.state.googlePlaceId
    }).then(res => {
      console.log(res);
    });
  };

  render() {
    return (
      <div>
        <Header attached='top' as='h4'>
          Create University
        </Header>
        <Segment attached>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Name'
                onChange={this.onChangeName}
              ></Form.Input>
              <Form.Input fluid label='Location'>
                <MapsAutoComplete handleOnSelect={this.onSelectLocation} />
              </Form.Input>
            </Form.Group>
            <Form.TextArea
              label='Description'
              onChange={this.onChangeDescription}
            ></Form.TextArea>
            <Form.Input label='Image URL' onChange={this.onChangeImageURL} />
            <div align='right'>
              <Form.Button onClick={this.onSubmit}>Submit</Form.Button>
            </div>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default CreateUniversities;
