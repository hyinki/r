import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Form, Button } from "react-bootstrap"; // Import Bootstrap components

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate(); // To navigate to the homepage after login

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      const token = res.data.token;
      console.log("Token:", token);
      localStorage.setItem("token", token);
      toast.success("Logged in successfully! Redirecting...", {
        autoClose: 3000,
      }); // Success Toast

      // Redirect to the homepage after 3 seconds
      setTimeout(() => {
        navigate("/hotels");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error during login"); // Error Toast
      console.error("Error during login:", err.response?.data);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Login</h1>
      <ToastContainer /> {/* Toastify container for notifications */}
      <Form onSubmit={onSubmit}>
        {" "}
        {/* React Bootstrap Form */}
        <Form.Group controlId="formEmail">
          {" "}
          {/* Bootstrap Form.Group */}
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          {" "}
          {/* Bootstrap Form.Group */}
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {" "}
          {/* Bootstrap Button */}
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
