const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    type: { type: String, enum: ['Lost', 'Found'], required: true },
    category: {
      type: String,
      enum: ['Electronics', 'Valuables', 'Documents'],
    },
    location: { type: String, required: true, trim: true },
    date: { type: Date, default: Date.now },
    contactInfo: { type: String, trim: true },
    imageUrl: { type: String, trim: true, default: '' },
    status: { type: String, enum: ['Active', 'Claimed'], default: 'Active' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
