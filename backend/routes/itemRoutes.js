const express = require('express');
const router = express.Router();
const { createItem, getItems, updateItemStatus } = require('../controllers/itemController');

router.post('/', createItem);
router.get('/', getItems);
router.patch('/:id/status', updateItemStatus);

module.exports = router;
