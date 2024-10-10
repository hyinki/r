import React, { useState } from 'react';
import { Container, Card, Button, Row, Col, Alert } from 'react-bootstrap';

const programs = [
  { id: 1, name: 'Leadership Workshop', description: 'A workshop on leadership skills.' },
  { id: 2, name: 'Career Development', description: 'Learn about different career opportunities.' },
  { id: 3, name: 'Coding Bootcamp', description: 'A crash course on web development.' }
];

const EventSignup = () => {
  const [signups, setSignups] = useState([]);
  const [notification, setNotification] = useState(null);

  const handleSignup = (program) => {
    if (signups.some(signup => signup.id === program.id)) {
      setNotification({ variant: 'warning', message: `You have already signed up for ${program.name}.` });
    } else {
      setSignups([...signups, program]);
      setNotification({ variant: 'success', message: `You have successfully signed up for ${program.name}.` });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveSignup = (programId) => {
    setSignups(signups.filter(signup => signup.id !== programId));
    setNotification({ variant: 'info', message: 'You have been removed from the program.' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Youth Mentoring Programs</h2>

      {notification && (
        <Alert variant={notification.variant} onClose={() => setNotification(null)} dismissible>
          {notification.message}
        </Alert>
      )}

      <Row className="mb-5">
        {programs.map(program => (
          <Col key={program.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{program.name}</Card.Title>
                <Card.Text>{program.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleSignup(program)}
                  disabled={signups.some(signup => signup.id === program.id)}
                >
                  {signups.some(signup => signup.id === program.id) ? 'Signed Up' : 'Sign Up'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3 className="mb-3">Your Sign-Ups</h3>
      {signups.length > 0 ? (
        <ul className="list-group">
          {signups.map((signup) => (
            <li key={signup.id} className="list-group-item d-flex justify-content-between align-items-center">
              {signup.name}
              <Button variant="danger" size="sm" onClick={() => handleRemoveSignup(signup.id)}>
                Cancel
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">You haven't signed up for any programs yet.</p>
      )}
    </Container>
  );
};

export default EventSignup;