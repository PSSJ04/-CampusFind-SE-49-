require('dotenv').config();
const dns = require('dns');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const itemsRouter = require('./routes/items');

// mongodb+srv:// needs a DNS SRV lookup before it can even find the cluster
// hosts. Some routers/VPNs/campus networks hand out a DNS server that
// refuses or mishandles SRV queries, causing "querySrv ECONNREFUSED" before
// Atlas is ever contacted. Forcing a public resolver avoids that.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
}));

// Routes
app.get('/', (req, res) => {
  res.send('CampusFind Backend API is running');
});

app.use('/api/items', itemsRouter);

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/campusfind')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB Connection Error: ', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
