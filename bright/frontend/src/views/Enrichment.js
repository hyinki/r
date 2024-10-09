import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Enrichment() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.description || !formData.file) {
      setError('All fields are required!');
      return;
    }

    // Simulate submission
    console.log('Form Data:', formData);
    setSubmitted(true);
    setError('');

    // Reset form
    setFormData({
      name: '',
      description: '',
      file: null,
    });
  };

  return (
    <Container>
      <h2 className="my-4 text-center">Submit Proof of Engagement</h2>

      {/* Success message */}
      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Proof submitted successfully! You'll receive your incentive shortly.
        </Alert>
      )}

      {/* Error message */}
      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Name Field */}
        <Form.Group controlId="formName" className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description of Activity</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            placeholder="Describe who you taught and what you taught"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* File Upload */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload Proof (Photo/Video)</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit 
        </Button>
      </Form>
    </Container>
  );
}

export default Enrichment;

