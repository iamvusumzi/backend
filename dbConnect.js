const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.DB_URL);

const dbConnect = async () => {
  try {
    await mongoose.connect(
        process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = dbConnect;