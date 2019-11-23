// Styles
import './styles/SideMenu.css';

import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class SideMenu extends React.Component {
  state = { activeItem: undefined, user: this.props.getUser };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const user = this.state.user;
    const activeItem = this.state.activeItem;

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
            {user.role === 'admin' || user.role === 'super admin' ? (
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
            ) : null}
          </Menu.Menu>
          <Menu.Menu>
            <Menu.Header>RSO</Menu.Header>
            <Menu.Item
              as={Link}
              to='/rso/browse'
              name='rBrowse'
              active={activeItem === 'rBrowse'}
              onClick={this.handleItemClick}
            >
              <Icon name='newspaper outline' />
              Browse
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/rso/create'
              name='rCreate'
              active={activeItem === 'rCreate'}
              onClick={this.handleItemClick}
            >
              <Icon name='plus square outline' />
              Create
            </Menu.Item>
            <Menu.Item
              as={Link}
              to='/rso/manage'
              name='rManage'
              active={activeItem === 'rManage'}
              onClick={this.handleItemClick}
            >
              <Icon name='edit outline' /> Manage
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
              to='/university/manage'
              name='uManage'
              active={activeItem === 'uManage'}
              onClick={this.handleItemClick}
            >
              <Icon name='edit outline' /> Manage
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default SideMenu;
