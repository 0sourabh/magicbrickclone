const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address, dob } = req.body;

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hash, phone, address, dob });

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, phone, dob, newPassword } = req.body;

    // Find user by email, phone, and dob
    const user = await User.findOne({ email, phone, dob });
    if (!user) return res.status(400).json({ msg: "User not found or data mismatch" });

    // Hash the new password
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    // Save the updated user
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob } = req.body;

    // Find user by ID
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update user fields
    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.dob = dob || user.dob;

    // Save the updated user
    await user.save();

    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
