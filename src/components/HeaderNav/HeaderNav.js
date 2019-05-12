import React from 'react';
import './HeaderNav.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";

function HeaderNav() {
  return (
    <header>
      <Navbar variant="dark" bg="primary" expand="lg" role="banner">
        <HeaderNavbarBrand/>
        <Nav mr="auto" as="ul">
          <HeaderNavItem to="/datasets">Datasets</HeaderNavItem>
          <HeaderNavItem to="/networks">Networks</HeaderNavItem>
        </Nav>
      </Navbar>
    </header>);
}

function HeaderNavbarBrand() {
  // TODO: 12.05.2019 John - use dedicated logo
  return (
    <Navbar.Brand as={NavLink} exact to="/">
      <div className="HeaderNavbarBrand-logo d-inline-block align-top"/>
      {' maglearn'}
    </Navbar.Brand>
  );
}

function HeaderNavItem(props) {
  return (
    <Nav.Item as="li">
      <Nav.Link as={NavLink} activeClassName="active" {...props}>{props.children}</Nav.Link>
    </Nav.Item>
  );
}

export default HeaderNav;