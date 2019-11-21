import React from 'react';
import {
  Segment,
  Header,
  Item,
  Table,
  Menu,
  Icon,
  Pagination
} from 'semantic-ui-react';
import axios from 'axios';
import Moment from 'react-moment';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import './BrowseEvents.css';
import moment from 'moment';

const api = 'http://localhost:8080/';

class BrowseEvents extends React.Component {
  state = {
    upcomingEvents: [],
    events: []
  };
  componentDidMount() {
    axios.get(`${api}event/getUpcoming`).then(res => {
      console.log(res.data);
      this.setState({ upcomingEvents: res.data });
    });
    axios.get(`${api}event/getAll`).then(res => {
      console.log(res.data);
      this.setState({
        events: res.data.map(event => {
          return {
            name: event.name,
            start: event.start,
            end: event.end,
            description: event.description,
            location: event.googlePlaceId
          };
        })
      });
    });
  }

  renderReadableDate = event => {
    new window.google.maps.Geocoder().geocode(
      {
        placeId: event.googlePlaceId
      },
      result => {
        console.log(result[0].formatted_address);
      }
    );
  };

  render() {
    return (
      <div>
        <Header as='h4' dividing attached='top'>
          UPCOMING
        </Header>
        <Segment attached>
          <Item.Group>
            {this.state.upcomingEvents.map(event => {
              return (
                <Item key={event.id}>
                  <Item.Image>
                    <div id='day'>
                      <Moment format='D'>{event.start}</Moment>
                    </div>
                    <br />
                    <Moment format='MMM'>{event.start}</Moment>
                  </Item.Image>
                  <Item.Content>
                    <Item.Header as='a'>{event.name}</Item.Header>
                    <Item.Meta>
                      <Moment format='h:mm a'>{event.start}</Moment>
                      {' - '}
                      <Moment format='h:mm a'>{event.end}</Moment> |{' '}
                    </Item.Meta>
                    <Item.Description>{event.description}</Item.Description>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>
        </Segment>
        <Header as='h4' dividing attached='top'>
          ALL EVENTS
        </Header>
        <Segment attached>
          <Table>
            <ReactTable
              filterable
              data={this.state.events}
              columns={[
                { Header: 'Name', accessor: 'name' },
                {
                  Header: 'Date/Time',
                  accessor: 'start',
                  Cell: ({ row }) => {
                    const calendarString = { sameElse: 'MMM DD [at] LT' };
                    return (
                      <div>
                        <Moment calendar={calendarString} date={row.start} />
                        {' - '}
                        <Moment format='LT' date={row._original.end} />
                      </div>
                    );
                  }
                },

                {
                  Header: 'Location',
                  accessor: 'location',
                  Cell: ({ row }) => {
                    console.log('before', row.location);
                    return <div></div>;
                  }
                },
                { Header: 'Description', accessor: 'description' }
              ]}
            />
          </Table>
        </Segment>
      </div>
    );
  }
}

export default BrowseEvents;
