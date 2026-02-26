const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      "image-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    image: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;