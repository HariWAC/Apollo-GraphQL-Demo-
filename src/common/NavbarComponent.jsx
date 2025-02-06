// src/common/NavbarComponent.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Correct import

const NavbarComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {/* Wrap only Navbar.Brand in Link */}
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/graphqlform">GraphQLForm</Nav.Link>
          <Nav.Link as={Link} to="/spaceform">SpaceForm</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          {/* <Nav.Link as={Link} to="/logout">Logout</Nav.Link> */}
          {/* <Nav.Link as={Link} to="/facebook">Facebook</Nav.Link> */}          
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
   



