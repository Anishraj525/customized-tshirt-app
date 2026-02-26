const express = require("express");
const router = express.Router();

const {
  addOrderItems,
  getMyOrders,
  getOrders,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

// Create order & Admin get all orders
router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders);

// Logged-in user orders
router.route("/myorders").get(protect, getMyOrders);

module.exports = router;
