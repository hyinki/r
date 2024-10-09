import React from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Form,
} from "react-bootstrap";

const test = () => {
  return (
    <div>
      {/* button */}
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>

      {/* container */}
      <Container>
        <Row>
          <Col md={6}>Column 1</Col>
          <Col md={6}>Column 2</Col>
        </Row>
      </Container>

      {/* navbar */}

      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
            </Col>
            </Row>
            <Row>

            <Col  md={6}>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Col>
            
          </Row>
          <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
      </Container>
    </div>
  );
};

export default test;
