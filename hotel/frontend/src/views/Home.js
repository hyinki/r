import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="jumbotron text-center" style={{ backgroundImage: `url('https://via.placeholder.com/1600x600?text=Find+Your+Perfect+Hotel')`, backgroundSize: 'cover', color: 'white', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 className="display-4">Find Your Perfect Hotel</h1>
        <p className="lead">Book your next stay from thousands of top-rated hotels worldwide</p>
        <div className="input-group mb-3 w-50 mx-auto">
          <input type="text" className="form-control" placeholder="Search for a hotel..." aria-label="Search for a hotel" aria-describedby="button-addon2" />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
          </div>
        </div>
      </div>

      {/* Featured Hotels */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Hotels</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/400x300?text=Luxury+Hotel" className="card-img-top" alt="Hotel 1" />
              <div className="card-body">
                <h5 className="card-title">Luxury Hotel</h5>
                <p className="card-text">A 5-star hotel offering world-class luxury and service.</p>
                <Link to="/hotels/1" className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/400x300?text=Beachfront+Resort" className="card-img-top" alt="Hotel 2" />
              <div className="card-body">
                <h5 className="card-title">Beachfront Resort</h5>
                <p className="card-text">Relax by the beach in this stunning seaside resort.</p>
                <Link to="/hotels/2" className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img src="https://via.placeholder.com/400x300?text=City+Center+Hotel" className="card-img-top" alt="Hotel 3" />
              <div className="card-body">
                <h5 className="card-title">City Center Hotel</h5>
                <p className="card-text">Stay in the heart of the city with easy access to top attractions.</p>
                <Link to="/hotels/3" className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">"Amazing service and beautiful hotels. Best experience ever!"</p>
                <h5 className="card-title">- John Doe</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">"A seamless booking experience. I loved every moment!"</p>
                <h5 className="card-title">- Jane Smith</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <p className="card-text">"Affordable prices and great customer support. Highly recommended!"</p>
                <h5 className="card-title">- Robert Brown</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Popular Destinations</h2>
        <div className="row">
          <div className="col-md-3">
            <img src="https://via.placeholder.com/300x200?text=Paris" className="img-fluid mb-3" alt="Paris" />
            <h5 className="text-center">Paris</h5>
          </div>
          <div className="col-md-3">
            <img src="https://via.placeholder.com/300x200?text=New+York" className="img-fluid mb-3" alt="New York" />
            <h5 className="text-center">New York</h5>
          </div>
          <div className="col-md-3">
            <img src="https://via.placeholder.com/300x200?text=Tokyo" className="img-fluid mb-3" alt="Tokyo" />
            <h5 className="text-center">Tokyo</h5>
          </div>
          <div className="col-md-3">
            <img src="https://via.placeholder.com/300x200?text=Dubai" className="img-fluid mb-3" alt="Dubai" />
            <h5 className="text-center">Dubai</h5>
          </div>
        </div>
      </div>

      

      {/* Call to Action */}
      <div className="container text-center mt-5">
        <h3>Explore More Hotels</h3>
        <p className="lead">Find great deals and offers across various destinations.</p>
        <Link to="/hotels" className="btn btn-outline-primary btn-lg">Browse Hotels</Link>
      </div>

    </div>
  );
}

export default Home;
