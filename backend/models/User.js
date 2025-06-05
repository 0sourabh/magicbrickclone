const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Details
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false // hides password by default in queries
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },

    address: {
      type: String,
      trim: true
    },

    // Additional Info
    dob: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future"
      }
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);
