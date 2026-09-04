const Item = require('../models/Item');

// @desc    Create new item (Lost/Found)
// @route   POST /api/items
// @access  Public
const createItem = async (req, res) => {
  try {
    const { type, name, location, date, description, contactInfo, imageUrl } = req.body;

    // Validate required fields
    if (!type || !name || !location || !date || !description || !contactInfo) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const item = await Item.create({
      type,
      name,
      location,
      date,
      description,
      contactInfo,
      imageUrl
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

module.exports = {
  createItem,
};
