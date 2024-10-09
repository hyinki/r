import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BrowseHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]); // State for filtered hotels
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
  }); // State for filters

  // Fetch all hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      try {
        const res = await axios.get('http://localhost:5000/api/hotels', {
          headers: {
            'x-auth-token': token, // Include token in the headers
          },
        });
        setHotels(res.data);
        setFilteredHotels(res.data); // Set initially loaded hotels as filteredHotels
      } catch (err) {
        console.error('Error fetching hotels', err.response?.data);
      }
    };

    fetchHotels();
  }, []);

  // Handle input change for search and filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filter hotels based on search query and filter values
  useEffect(() => {
    let filteredList = hotels;

    // Apply search filter
    if (searchQuery) {
      filteredList = filteredList.filter((hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply location filter
    if (filters.location) {
      filteredList = filteredList.filter((hotel) =>
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply price filter (min and max)
    if (filters.minPrice) {
      filteredList = filteredList.filter((hotel) => hotel.price >= filters.minPrice);
    }

    if (filters.maxPrice) {
      filteredList = filteredList.filter((hotel) => hotel.price <= filters.maxPrice);
    }

    setFilteredHotels(filteredList); // Update the filtered hotels list
  }, [searchQuery, filters, hotels]); // Re-filter when searchQuery, filters, or hotels change

  return (
    <div className="container mt-5">
      <h2>Available Hotels</h2>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        {/* Search Bar */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by hotel name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Location Filter */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Filter by location..."
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>

        {/* Price Filter */}
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Hotels Listing */}
      <div className="row">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div key={hotel._id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{hotel.name}</h5>
                  <p className="card-text">{hotel.description}</p>
                  <p className="card-text">
                    <small>Location: {hotel.location}</small>
                  </p>
                  <p className="card-text">
                    <small>Price: ${hotel.price}</small>
                  </p>
                  <button className="btn btn-primary">Book Hotel</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels match your criteria</p>
        )}
      </div>
    </div>
  );
};

export default BrowseHotels;
