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

// @desc    Get all items (with optional query filters)
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const { type, location, search } = req.query;
    let query = {};
    
    if (type) query.type = type;
    if (location) query.location = location;
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    const items = await Item.find(query).sort({ createdAt: -1 }); // Newest first
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

// @desc    Update item status
// @route   PATCH /api/items/:id/status
// @access  Public
const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['Active', 'Claimed', 'Returned'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.status = status;
    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server Error' });
  }
};

module.exports = {
  createItem,
  getItems,
  updateItemStatus,
};
