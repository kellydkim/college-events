import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import './SideMenu.css';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;
    return (
      <div id='side'>
        <Menu fixed='left' pointing secondary vertical>
          <Menu.Header>EVENTS</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              as={Link}
              to='/event/view'
              name='Browse'
              active={activeItem === 'Browse'}
              onClick={this.handleItemClick}
            >
              <Icon name='newspaper outline' />
              Browse
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/event/create'
              name='Create'
              active={activeItem === 'Create'}
              onClick={this.handleItemClick}
            >
              <Icon name='plus square outline' />
              Create
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/event/edit'
              name='Edit'
              active={activeItem === 'Edit'}
              onClick={this.handleItemClick}
            >
              <Icon name='edit outline' />
              Edit
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu>
            <Menu.Header>University</Menu.Header>
            <Menu.Item
              as={Link}
              to='/university/create'
              name='uCreate'
              active={activeItem === 'uCreate'}
              onClick={this.handleItemClick}
            >
              <Icon name='plus square outline' />
              Create
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/university/edit'
              name='uEdit'
              active={activeItem === 'uEdit'}
              onClick={this.handleItemClick}
            >
              <Icon name='edit outline' /> Edit
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default SideMenu;
