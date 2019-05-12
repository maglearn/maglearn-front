import React from 'react';
import './HeaderNav.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";

function HeaderNavItem(props) {
  return <Nav.Item as="li">
    <Nav.Link as={NavLink} activeClassName="active" {...props}>{props.children}</Nav.Link>
  </Nav.Item>;
}

function HeaderNav(props) {
  // TODO: 12.05.2019 John - use dedicated logo
  return <header>
    <Navbar bg="light" expand="lg" role="banner">
      <Navbar.Brand as={NavLink} exact to="/">
        <img
          alt=""
          src="/safari-pinned-tab.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' maglearn'}
      </Navbar.Brand>
      <Nav className="mr-auto" as="ul">
        <HeaderNavItem to="/datasets">Datasets</HeaderNavItem>
        <HeaderNavItem to="/networks">Networks</HeaderNavItem>
      </Nav>
    </Navbar>
  </header>
}

export default HeaderNav;