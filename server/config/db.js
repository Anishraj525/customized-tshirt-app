const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
