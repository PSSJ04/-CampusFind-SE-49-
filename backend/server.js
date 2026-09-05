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
  origin: ['https://classy-starburst-c63921.netlify.app', 'http://localhost:5173'],
  credentials: true
}));

// Routes
app.use('/api/items', require('./routes/itemRoutes'));

app.get('/', (req, res) => {
  res.send('CampusFind Backend API is running');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/campusfind')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


