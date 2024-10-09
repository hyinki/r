import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Fixed the import, jwtDecode should be default
import { Navbar, Nav, Button, Container } from 'react-bootstrap'; // Import Bootstrap components

const Header = ({ userRole }) => {
    const [role, setRole] = useState(null); // Track user's role (manager/senior)
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
    
    console.log(userRole)
    const logout = () => {
      localStorage.removeItem('token');
      setRole(null); // Clear the role
      navigate('/'); // Redirect to login page
    };
  
    return (
      <Navbar bg="dark" variant="dark" expand="lg"> {/* React Bootstrap Navbar */}
        <Container>
          <Navbar.Brand as={Link} to="/">
            Brighton Connection
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ml-auto"> {/* React Bootstrap Nav */}
              {!userRole ? (
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
              ) : userRole == 'manager' ? (
                // Links for managers (Tasks, Tracking, Log Out)
                <>
                  <Nav.Link as={Link} to="/tasks">
                    Tasks
                  </Nav.Link>
                  <Nav.Link as={Link} to="/tracking">
                    Tracking
                  </Nav.Link>
                  <Button variant="link" className="nav-link" onClick={logout}>
                    Log Out
                  </Button>
                </>
              ) : userRole == 'senior' ? (
                // Links for seniors (Tasks, Enrichment, Log Out)
                <>
                  <Nav.Link as={Link} to="/tasks">
                    Tasks
                  </Nav.Link>
                  <Nav.Link as={Link} to="/enrichment">
                    Enrichment
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
