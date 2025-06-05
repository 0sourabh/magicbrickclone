const Property = require("../models/Property");

exports.addProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      price,
      location,
      area,
      bedrooms,
      bathrooms,
      furnishing,
      amenities,
    } = req.body;

    const images = req.files.map((file) => file.path); // Extract image URLs from uploaded files

    const property = await Property.create({
      title,
      description,
      propertyType,
      price,
      location,
      area,
      bedrooms,
      bathrooms,
      furnishing,
      amenities,
      images,
      userId: req.userId,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const { location, minPrice, maxPrice, propertyType } = req.query;
    let filter = {};

    if (location) filter.location = { $regex: location, $options: "i" };
    if (propertyType) filter.propertyType = { $regex: propertyType, $options: "i" };
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const properties = await Property.find(filter).populate("userId", "name email");
    res.json(properties);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ userId: req.userId });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("userId", "name email");
    if (!property) return res.status(404).json({ msg: "Property not found" });

    res.json(property);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      propertyType,
      price,
      location,
      area,
      bedrooms,
      bathrooms,
      furnishing,
      amenities,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.path) : undefined;

    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    // Update fields
    property.title = title || property.title;
    property.description = description || property.description;
    property.propertyType = propertyType || property.propertyType;
    property.price = price || property.price;
    property.location = location || property.location;
    property.area = area || property.area;
    property.bedrooms = bedrooms || property.bedrooms;
    property.bathrooms = bathrooms || property.bathrooms;
    property.furnishing = furnishing || property.furnishing;
    property.amenities = amenities || property.amenities;
    if (images) property.images = images;

    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    await property.remove();
    res.json({ msg: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
