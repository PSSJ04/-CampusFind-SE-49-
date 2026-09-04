require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
}));
const itemRoutes = require('./routes/items');
// Routes (To be implemented)
app.get('/', (req, res) => {
  res.send('CampusFind Backend API is running');
});
app.use('/api/items', itemRoutes);
// Database Connection
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not set. Check that backend/.env exists and is loaded.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000,
})
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected');
});
