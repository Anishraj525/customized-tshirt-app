const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile (protected)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
