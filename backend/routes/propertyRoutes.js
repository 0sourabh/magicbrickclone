const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/cloudinary");
const {
  addProperty,
  getAllProperties,
  getUserProperties,
} = require("../controllers/propertyController");

router.post("/", auth, upload.single("image"), addProperty);
router.get("/", getAllProperties);
router.get("/my", auth, getUserProperties);

module.exports = router;
