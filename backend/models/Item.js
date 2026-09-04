const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please specify if the item is Lost or Found'],
    enum: ['Lost', 'Found'],
  },
  name: {
    type: String,
    required: [true, 'Please provide the name of the item'],
    trim: true,
    index: true,
  },
  location: {
    type: String,
    required: [true, 'Please specify the location'],
    trim: true,
  },
  category: {
    type: String,
    default: 'Other',
    trim: true,
  },
  date: {
    type: Date,
    required: [true, 'Please provide the date it was lost or found'],
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description of the item'],
    trim: true,
  },
  contactInfo: {
    type: String,
    required: [true, 'Please provide contact information'],
    trim: true,
  },
  imageUrl: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Claimed', 'Returned', 'Claimed/Returned'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
