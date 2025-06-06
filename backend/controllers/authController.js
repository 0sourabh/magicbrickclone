const User = require("../models/User");
const Property = require("../models/Property");
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
    const { name, phone, address, dob, profileImage } = req.body;
    const user = await User.findById(req.userId); // <--- use req.userId
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.dob = dob || user.dob;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // This will return all fields except password
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId).select("+password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Optionally, delete user's properties as well
    await Property.deleteMany({ userId: req.userId });

    res.json({ msg: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
