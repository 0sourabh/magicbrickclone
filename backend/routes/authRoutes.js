const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, updateProfile } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/update-profile", updateProfile);

module.exports = router;
