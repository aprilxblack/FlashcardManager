import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Icon from '../images/main-icon.png';
import ProfileIcon from '../images/profile-icon.png';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
            <Navbar className="main-menu text-white navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow p-3 mb-3" light>
                <Container>
                    <a href="/"> <img src={Icon} alt={"Icon"} className="menu-icon" /></a>
                    <NavbarBrand tag={Link} to="/" className="text-white page-title">Flashcard Manager</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <a href="/profile">
                        <img src={ProfileIcon} alt={"Profile"} className="profile-icon"/>
                    </a>
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/">Home</NavLink>
                </NavItem>
                <NavItem className="main-menu-item">
                  <NavLink tag={Link} className="text-white" to="/profile">Profile</NavLink>
                </NavItem>
                 <NavItem className="main-menu-item">
                   <NavLink tag={Link} className="text-white" to="/browse-sets">Browse Sets </NavLink>
                </NavItem>
                 <NavItem className="main-menu-item">
                   <NavLink tag={Link} className="text-white" to="/create-a-set">Create a Set</NavLink>
                </NavItem>
                 <NavItem className="main-menu-item">
                   <NavLink tag={Link} className="text-white" to="/settings">Settings</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
