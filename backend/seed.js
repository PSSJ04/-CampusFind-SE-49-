require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

const seedItems = [
  {
    type: 'Lost',
    name: 'Student ID Card',
    location: 'Main Library',
    date: new Date(),
    description: 'Blue lanyard with an IT faculty student ID. Name: Nimal Perera. ID number starts with IT2023. Last seen on the 2nd floor reading area near the windows.',
    contactInfo: 'nimal.p@my.sliit.lk',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Found',
    name: 'Black Leather Wallet',
    location: 'Computing Faculty',
    date: new Date(),
    description: 'Found a black leather wallet under the desk in Lab 3. Contains some cash and a bank card. Handed it to the security desk at computing faculty.',
    contactInfo: '0712345678',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Lost',
    name: 'Lecture Notes - Software Engineering',
    location: 'Cafeteria',
    date: new Date(Date.now() - 86400000),
    description: 'A yellow spiral notebook containing Software Engineering lecture notes from weeks 1-8. Very important for the upcoming mid-terms! Has my name on the cover.',
    contactInfo: '0778899001',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Found',
    name: 'Wireless Earbuds (JBL)',
    location: 'Lecture Hall A',
    date: new Date(Date.now() - 43200000),
    description: 'Found a pair of white JBL wireless earbuds in the charging case. Left on a seat in the front row after the 10AM lecture. Currently with me.',
    contactInfo: 'kamal.s@my.sliit.lk',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Lost',
    name: 'Blue Water Bottle',
    location: 'Sports Complex',
    date: new Date(Date.now() - 172800000),
    description: 'A blue 750ml Nalgene water bottle with SLIIT stickers on it. Left it near the basketball court during the afternoon session.',
    contactInfo: '0761234567',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Lost',
    name: 'USB Flash Drive (32GB SanDisk)',
    location: 'Lab 2 - Computing',
    date: new Date(Date.now() - 259200000),
    description: 'Red SanDisk Cruzer 32GB USB flash drive. Contains important project files for SE2030 module. May have left it plugged into a PC in Lab 2.',
    contactInfo: 'sahan.w@my.sliit.lk',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Found',
    name: 'Prescription Glasses',
    location: 'Student Center',
    date: new Date(Date.now() - 86400000),
    description: 'Found a pair of rectangular black-framed prescription glasses in a brown case. Left on the counter at the student center cafe.',
    contactInfo: '0771112233',
    imageUrl: '',
    status: 'Active'
  },
  {
    type: 'Lost',
    name: 'Calculator (Casio fx-991EX)',
    location: 'Engineering Faculty',
    date: new Date(Date.now() - 345600000),
    description: 'Black Casio scientific calculator model fx-991EX. Has a small scratch on the cover. Lost after an Engineering Maths exam.',
    contactInfo: 'dinesh.r@my.sliit.lk',
    imageUrl: '',
    status: 'Claimed'
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/campusfind');
    console.log('MongoDB Connected for Seeding');

    await Item.deleteMany();
    console.log('Existing items cleared');

    await Item.insertMany(seedItems);
    console.log(`Database successfully seeded with ${seedItems.length} SLIIT-specific items!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
