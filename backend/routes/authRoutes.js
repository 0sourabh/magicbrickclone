const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, updateProfile, getProfile, changePassword, deleteAccount } = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/", login);
router.post("/forgot-password", forgotPassword);
router.put("/update-profile", auth, updateProfile);
router.get("/me", auth, getProfile);
router.post("/change-password", auth, changePassword);
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;
