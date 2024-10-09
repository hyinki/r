import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyHotel = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  // Fetch the seller's hotels
  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/hotels/my-hotels', {
          headers: {
            'x-auth-token': token // Include token in request headers
          }
        });
        setHotels(res.data);
      } catch (err) {
        console.error('Error fetching hotels', err.response?.data);
      }
    };

    fetchHotels();
  }, []);

  // Handle delete hotel
  const deleteHotel = async (hotelId) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    try {
      await axios.delete(`http://localhost:5000/api/hotels/${hotelId}`, {
        headers: {
          'x-auth-token': token, // Include token in the headers
        }
      });
      // Update the local state to reflect the deleted hotel
      setHotels(hotels.filter(hotel => hotel._id !== hotelId));
    } catch (err) {
      console.error('Error deleting hotel', err.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Hotels</h2>
      <button className="btn btn-primary mb-4" onClick={() => navigate('/add-hotel')}>Add Hotel</button>
      <div className="row">
        {hotels.length ? (
          hotels.map((hotel) => (
            <div key={hotel._id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">{hotel.description}</p>
                  <p className="card-text">Location: {hotel.location}</p>
                  <p className="card-text">Price: ${hotel.price}</p>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/edit-hotel/${hotel._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this hotel?")) {
                        deleteHotel(hotel._id); // Confirm before deletion
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found. Add your first hotel!</p>
        )}
      </div>
    </div>
  );
};

export default MyHotel;
