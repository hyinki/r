const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const Hotel = require('../models/Hotel');
const mongoose = require('mongoose');


// Add a hotel (Only sellers can add hotels)
router.post('/', auth, checkRole('seller'), async (req, res) => {
  try {
    const { name, location, price, availability, description } = req.body;
    const hotel = new Hotel({
      name,
      location,
      price,
      availability,
      description,
      sellerId: req.user.userId  // Associate the hotel with the seller
    });

    const savedHotel = await hotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all hotels (All users can view hotels)
router.get('/', auth, async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a hotel (Only sellers can update their hotels)
router.put('/:id', auth, checkRole('seller'), async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ msg: 'Hotel not found' });

    // Make sure the seller owns the hotel
    if (hotel.sellerId.toString() !== req.user.userId) {
      return res.status(403).json({ msg: 'Access denied: you do not own this hotel' });
    }

    const { name, location, price, availability, description } = req.body;
    hotel.name = name || hotel.name;
    hotel.location = location || hotel.location;
    hotel.price = price || hotel.price;
    hotel.availability = availability || hotel.availability;
    hotel.description = description || hotel.description;

    const updatedHotel = await hotel.save();
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get hotels owned by the seller (Only sellers can view their own hotels)
router.get('/my-hotels', auth, checkRole('seller'), async (req, res) => {
  try {
    const hotels = await Hotel.find({ sellerId: req.user.userId }); // Get hotels owned by this seller
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, checkRole('seller'), async (req, res) => {
  try {

    // Validate if ID is a valid Mongo ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'Invalid hotel ID' });
    }

    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      console.log('Hotel not found');
      return res.status(404).json({ msg: 'Hotel not found' });
    }

    // Check if the seller is the owner of the hotel
    if (hotel.sellerId.toString() !== req.user.userId) {
      console.log(`Access denied. Hotel sellerId: ${hotel.sellerId}, userId: ${req.user.userId}`);
      return res.status(403).json({ msg: 'Access denied: you do not own this hotel' });
    }

    // Use deleteOne instead of remove
    await hotel.deleteOne(); // This will delete the specific hotel document

    console.log(`Hotel with id: ${req.params.id} deleted successfully`);
    res.status(200).json({ msg: 'Hotel deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /:id route:', err); // Log the full error
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

