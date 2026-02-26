const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

/* ---------------- STATIC FOLDERS ---------------- */

// Serve product images from public folder
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);

// Serve uploaded custom images
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

/* ---------------- ROOT ---------------- */

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});