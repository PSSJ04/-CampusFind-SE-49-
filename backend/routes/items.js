// backend/routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/Items');

// ... your existing POST and GET routes above ...
// GET /api/items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching items' });
  }
});
// PATCH /api/items/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ['Active', 'Claimed', 'Returned'];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error updating status' });
  }
});

module.exports = router;