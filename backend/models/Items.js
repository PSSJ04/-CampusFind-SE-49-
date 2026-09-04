const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['Lost', 'Found'], required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
  contactInfo: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, enum: ['Electronics', 'Valuables', 'Documents', 'Other'], default: 'Other' },
  status: { type: String, enum: ['Active', 'Claimed', 'Returned'], default: 'Active' },
}, { timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);