const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  propertyType: { type: String, required: true }, // Changed from `type`
  price: { type: Number, required: true },
  location: { type: String, required: true },
  area: { type: Number, required: true }, // sq.ft
  bedrooms: { type: String, required: true }, // can be '5+'
  bathrooms: { type: String, required: true },
  furnishing: { type: String, required: true },
  amenities: [{ type: String }], // array of strings
  images: [{ type: String }], // array of image URLs (Cloudinary links)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, {
  timestamps: true
});

module.exports = mongoose.model("Property", propertySchema);
