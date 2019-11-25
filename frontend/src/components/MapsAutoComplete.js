import debounce from 'lodash.debounce';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

const autocompleteService = new window.google.maps.places.AutocompleteService();
const geocoderService = new window.google.maps.Geocoder();

export default class AutoComplete extends Component {
  state = { isLoading: false, results: [], value: '' };
  handleResultSelect = (e, { result }) => {
    geocoderService.geocode(
      {
        address: result.description
      },
      result => {
        this.props.handleonselect(result[0].place_id);
      }
    );
    this.setState({ value: result.title, selectedPlace: result });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    autocompleteService.getPlacePredictions(
      { input: value },
      this.handleAutocompleteResult
    );
  };

  handleAutocompleteResult = (predictions, status) => {
    console.log(predictions);
    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      this.setState({
        isLoading: false,
        results: predictions.map(prediction => {
          return {
            key: prediction.id,
            title: prediction.structured_formatting.main_text,
            description: prediction.structured_formatting.secondary_text,
            source: prediction
          };
        })
      });
    }
  };

  render() {
    const { isLoading, value, results, selectedPlace } = this.state;

    return (
      <Search
        fluid
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={debounce(this.handleSearchChange, 500, {
          leading: true
        })}
        results={results}
        value={value}
        {...this.props}
      />
    );
  }
}
