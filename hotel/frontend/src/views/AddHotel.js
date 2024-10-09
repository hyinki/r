import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddHotel = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    availability: true,
    description: ''
  });

  const { name, location, price, availability, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you're storing the JWT in localStorage
    console.log('Retrieved Token:', token);
    

    try {
      const res = await axios.post('http://localhost:5000/api/hotels', formData, {
        headers: {
          'x-auth-token': token
        }
      });
      toast.success('Hotel added successfully!');
    } catch (err) {
      toast.error('Error adding hotel: ' + err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Add a Hotel</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={location}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={price}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Hotel
        </button>
      </form>
    </div>
  );
};

export default AddHotel;
