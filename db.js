const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongo_uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB }