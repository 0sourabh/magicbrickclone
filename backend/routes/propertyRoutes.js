const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../utils/cloudinary");
const { addProperty, getAllProperties, getUserProperties, deleteProperty, getPropertyById } = require("../controllers/propertyController");

router.post("/", auth, upload.array("images", 10), addProperty);
router.get("/my", auth, getUserProperties);
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.delete("/:id", auth, deleteProperty);

module.exports = router;
