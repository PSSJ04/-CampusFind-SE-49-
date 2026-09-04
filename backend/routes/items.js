const express = require('express');
const Item = require('../models/Item');

const router = express.Router();

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/items?type=&location=&category=&search=
router.get('/', async (req, res) => {
  try {
    const { type, location, category, search } = req.query;
    const query = {};

    if (type) query.type = type;
    if (location) query.location = location;
    if (category) query.category = category;
    if (search) {
      const pattern = escapeRegex(search.trim());
      query.$or = [
        { name: { $regex: pattern, $options: 'i' } },
        { description: { $regex: pattern, $options: 'i' } },
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create item', error: err.message });
  }
});

router.patch('/:id/status', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update status', error: err.message });
  }
});

module.exports = router;
