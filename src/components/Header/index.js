import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { signout } from "../../actions/auth.actions";

const Header = () => {

  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const logout = () => { // log out function
    dispatch(signout()) // dispatch log out action
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          {/* we don't need NavLink here because we don't need the active style */}
          <span className="nav-link" onClick={logout}>
            Sign Out
          </span>
        </li>
    </Nav>
    )
  }

  const renderNotLoggedInLinks = () => {
    return (
      <Nav>
      {/* <Nav.Link href="#deets">Sign In</Nav.Link> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/signin">
            Sign In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
    </Nav>
    )
  }
  return (
    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1 }}>
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
         {auth.authenticated ? renderLoggedInLinks(): renderNotLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
