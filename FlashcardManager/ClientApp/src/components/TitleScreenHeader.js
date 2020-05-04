import React, { Component } from 'react';
import Icon from '../images/main-icon.png';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class TitleScreenHeader extends Component {
    render() {
        return (
            <div className="main-menu text-white navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow p-3 mb-3">
                <img src={Icon} className="icon mr-3" />
                <NavbarBrand tag={Link} to="/" className="text-white page-title">Flashcard Manager</NavbarBrand>
            </div>
        )
    }
}