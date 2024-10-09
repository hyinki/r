const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  availability: Boolean,
  description: String,
  sellerId: mongoose.Schema.Types.ObjectId // Reference to seller
});

module.exports = mongoose.model('Hotel', hotelSchema);
