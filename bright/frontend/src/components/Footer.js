import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <p>&copy; 2024 Brighton Connection. All Rights Reserved.</p>
      <p>
        <Link to="/about" className="text-white">About Us</Link> | 
        <Link to="/contact" className="text-white">Contact</Link> | 
        <Link to="/terms" className="text-white">Terms & Conditions</Link>
      </p>
    </footer>
  );
};

export default Footer;
