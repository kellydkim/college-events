import React from 'react';
import { Segment, Form } from 'semantic-ui-react';
import AutoComplete from './AutoComplete';
import Axios from 'axios';

class CreateUniversities extends React.Component {
  state = {
    name: undefined,
    description: undefined,
    imageURL: undefined,
    googlePlaceId: undefined
  };

  onSelectLocation = googlePlaceId => {
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
    });
  };

  render() {
    return (
      <div>
        <Segment>
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Name'
                onChange={this.onChangeName}
              ></Form.Input>
              <Form.Input fluid label='Location'>
                <AutoComplete handleOnSelect={this.onSelectLocation} />
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
