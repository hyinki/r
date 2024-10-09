import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // For navigation
import { toast, ToastContainer } from 'react-toastify';  // For toast notifications
import 'react-toastify/dist/ReactToastify.css';  // Toastify CSS

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role is user
  });

  const { name, email, password, role } = formData;
  const navigate = useNavigate();  // To navigate to login after signup

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      toast.success('Signed up successfully! Redirecting to login...', { autoClose: 3000 }); // Success Toast
      
      // Redirect to the login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response.data.message || 'Error during sign up'); // Error Toast
      console.error('Error during sign up:', err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Sign Up</h1>
      <ToastContainer /> {/* Toastify container for showing notifications */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            required
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
