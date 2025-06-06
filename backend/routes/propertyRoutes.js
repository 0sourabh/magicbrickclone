const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/cloudinary");
const {
  addProperty,
  getAllProperties,
  getUserProperties,
  deleteProperty,
} = require("../controllers/propertyController");

router.post("/", auth, upload.array("images", 10), addProperty);
router.get("/", getAllProperties);
router.get("/my", auth, getUserProperties);
router.delete("/:id", auth, deleteProperty);

module.exports = router;
