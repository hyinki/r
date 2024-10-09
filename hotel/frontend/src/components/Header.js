import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Fixed the import, jwtDecode should be default
import { Navbar, Nav, Button, Container } from 'react-bootstrap'; // Import Bootstrap components

const Header = () => {
    const [role, setRole] = useState(null); // Track user's role (user/seller)
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token); // Decode the token to extract role
          
          setRole(decodedToken.role); // Assume the role is in the token payload
          
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }, []); // Only run this effect once, when the component mounts
  
    const logout = () => {
      localStorage.removeItem('token');
      setRole(null); // Clear the role
      navigate('/login'); // Redirect to login page
    };
  
    return (
      <Navbar bg="dark" variant="dark" expand="lg"> {/* React Bootstrap Navbar */}
        <Container>
          <Navbar.Brand as={Link} to="/">
            Hotel Booking
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto"> {/* React Bootstrap Nav */}
              {!role ? (
                // Links before login (Home, Sign Up, Login)
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
                    Sign Up
                  </Nav.Link>
                </>
              ) : role === 'seller' ? (
                // Links for sellers (Browse Hotels, Add Hotels, Log Out)
                <>
                  <Nav.Link as={Link} to="/hotels">
                    Browse Hotels
                  </Nav.Link>
                  <Nav.Link as={Link} to="/myhotel">
                    My Hotel
                  </Nav.Link>
                  <Nav.Link as={Link} to="/add-hotel">
                    Add Hotel
                  </Nav.Link>
                  <Button variant="link" className="nav-link" onClick={logout}>
                    Log Out
                  </Button>
                </>
              ) : role === 'user' ? (
                // Links for users (Browse Hotels, Log Out)
                <>
                  <Nav.Link as={Link} to="/hotels">
                    Browse Hotels
                  </Nav.Link>
                  <Button variant="link" className="nav-link" onClick={logout}>
                    Log Out
                  </Button>
                </>
              ) : null }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default Header;
