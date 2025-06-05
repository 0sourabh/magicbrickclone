const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  type: String,
  image: String,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
module.exports = mongoose.model("Property", propertySchema);
