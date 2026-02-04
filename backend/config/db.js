const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/lifesync";
    const conn = await mongoose.connect(dbUrl);
    console.log(`Connted To Mongodb`);
  } catch (error) {
    console.log(`Mongodb Error ${error}`);
  }
};

module.exports = connectDB;
