const dns = require('dns');
// Set public DNS servers to resolve SRV records properly across local/campus networks
dns.setServers(['8.8.8.8', '1.1.1.1']);
const origLookup = dns.lookup;
dns.lookup = (hostname, opts, cb) => {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  origLookup(hostname, opts, (err, addr, family) => {
    if (err && (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED')) {
      dns.resolve4(hostname, (rErr, addrs) => {
        if (!rErr && addrs && addrs.length > 0) {
          if (opts && opts.all) return cb(null, addrs.map(a => ({ address: a, family: 4 })));
          return cb(null, addrs[0], 4);
        }
        cb(err, addr, family);
      });
    } else {
      cb(err, addr, family);
    }
  });
};

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

const Item = require('./models/Item');

// Routes
app.get('/', (req, res) => {
  res.send('CampusFind Backend API is running');
});

// Function 2: Search Items (GET /api/items)
app.get('/api/items', async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search && search.trim() !== '') {
      // Escape regex special characters to prevent invalid regex crashes
      const sanitized = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: sanitized, $options: 'i' };
    }

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Server error while fetching items' });
  }
});

// Helper endpoint to seed realistic sample data for testing
app.post('/api/items/seed', async (req, res) => {
  try {
    const count = await Item.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Database already has items', count });
    }
    const sampleItems = [
      {
        type: 'Lost',
        name: 'Black Leather Wallet',
        location: 'Main Library 2nd Floor',
        category: 'Valuables',
        description: 'Contains student ID and driving license. Lost around 2 PM.',
        contactInfo: 'it21000111@my.sliit.lk',
        status: 'Active',
      },
      {
        type: 'Found',
        name: 'SLIIT Student ID Card',
        location: 'Computing Building Lab 03',
        category: 'Documents',
        description: 'Found on desk row 4 after SE lecture.',
        contactInfo: 'security@sliit.lk',
        status: 'Active',
      },
      {
        type: 'Lost',
        name: 'Casio Scientific Calculator fx-991EX',
        location: 'Engineering Building C-401',
        category: 'Electronics',
        description: 'Black calculator with a small sticker on the back cover.',
        contactInfo: '0771234567',
        status: 'Active',
      },
      {
        type: 'Found',
        name: 'Car Keys with SLIIT Lanyard',
        location: 'Cafeteria Ground Floor',
        category: 'Valuables',
        description: 'Toyota key with blue SLIIT ribbon.',
        contactInfo: 'admin@sliit.lk',
        status: 'Active',
      },
      {
        type: 'Lost',
        name: 'Blue Hydro Flask Water Bottle',
        location: 'Sports Complex Gym',
        category: 'Other',
        description: '32oz blue bottle with slight dent on bottom.',
        contactInfo: '0719876543',
        status: 'Active',
      },
    ];
    const inserted = await Item.insertMany(sampleItems);
    res.status(201).json({ message: 'Sample items seeded successfully', items: inserted });
  } catch (error) {
    console.error('Error seeding items:', error);
    res.status(500).json({ error: 'Failed to seed sample items' });
  }
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/campusfind')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
