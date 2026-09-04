require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const seedItems = [
  {
    type: 'Lost',
    name: 'Student ID Card',
    location: 'Main Library, 2nd Floor',
    date: new Date(),
    description: 'A blue lanyard with an IT faculty student ID. Name: Nimal Perera.',
    contactInfo: 'nimal.p@sliit.lk',
    imageUrl: 'https://images.unsplash.com/photo-1579361661338-732389dcfd0e?q=80&w=200&auto=format&fit=crop',
    status: 'Active'
  },
  {
    type: 'Found',
    name: 'Black Leather Wallet',
    location: 'Computing Faculty, Lab 3',
    date: new Date(),
    description: 'Found a black leather wallet under the desk. Handed it over to the security desk at the computing faculty.',
    contactInfo: '0712345678',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=200&auto=format&fit=crop',
    status: 'Active'
  },
  {
    type: 'Lost',
    name: 'Lecture Notes - SE',
    location: 'Cafeteria',
    date: new Date(Date.now() - 86400000), // Yesterday
    description: 'A yellow spiral notebook containing Software Engineering lecture notes. Very important for the upcoming mid-terms!',
    contactInfo: '0778899001',
    imageUrl: '',
    status: 'Active'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/campusfind');
    console.log('MongoDB Connected for Seeding');

    await Item.deleteMany(); // Clear existing items
    console.log('Existing items cleared');

    await Item.insertMany(seedItems);
    console.log('Database successfully seeded with SLIIT dummy data!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
