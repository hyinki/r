const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const hotelRoutes = require('./routes/hotelRoutes');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/api/hotels', hotelRoutes); // All hotel-related routes
app.use('/api/auth', authRoutes); // Authentication routes

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
