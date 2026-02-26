const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();
console.log("Seeder using DB:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Sample products
const products = [
  {
    name: "Classic Black T-Shirt",
    image: "/images/black.jpg",
    brand: "Nike",
    category: "Clothing",
    description: "Premium cotton black t-shirt",
    price: 999,
    countInStock: 10,
  },
  {
    name: "White Oversized Tee",
    image: "/images/white.jpg",
    brand: "Adidas",
    category: "Clothing",
    description: "Comfortable oversized white t-shirt",
    price: 1299,
    countInStock: 15,
  },
];

// Import Data
const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();
