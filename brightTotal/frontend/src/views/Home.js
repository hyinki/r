import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className=" text-white text-center py-5" style={{ backgroundColor: '#4C4886'}}>
        <Container>
          <Row>
            <Col>
              <h1 className="display-4">Welcome to Brighton Connection</h1>
              <p className="lead">
                Empowering seniors through meaningful tasks and digital education.
              </p>
              
            </Col>
          </Row>
        </Container>
      </div>

      {/* SEP and DEP Section */}
      <Container className="mt-5">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="mb-3">Our Programs</h2>
            <p className="text-muted">
              At Brighton Connection, we offer programs to help seniors live with dignity and purpose.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="text-center">
            <div className="p-4 shadow-sm rounded bg-light">
              <h3 className="mb-3">Seniors Empowerment Program (SEP)</h3>
              <p>
                SEP provides seniors with opportunities to work on tasks and
                receive a stipend for their efforts.
              </p>
              <Button variant="primary" as={Link} to="/sep-tasks" style={{ backgroundColor: '#4C4886'}}>
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={6} className="text-center">
            <div className="p-4 shadow-sm rounded bg-light">
              <h3 className="mb-3">Digital Enrichment Program (DEP)</h3>
              <p>
                DEP offers seniors digital skills classes to help them adapt to
                the modern world.
              </p>
              <Button variant="primary" as={Link} to="/dep-classes" style={{ backgroundColor: '#4C4886'}}>
                Learn More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
