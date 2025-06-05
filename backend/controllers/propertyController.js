const Property = require("../models/Property");

exports.addProperty = async (req, res) => {
  const { title, price, location, type, description } = req.body;
  const image = req.file.path;
  const property = await Property.create({
    title, price, location, type, description, image, userId: req.userId
  });
  res.status(201).json(property);
};

exports.getAllProperties = async (req, res) => {
  const { location, minPrice, maxPrice } = req.query;
  let filter = {};
  if (location) filter.location = { $regex: location, $options: "i" };
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);

  const properties = await Property.find(filter);
  res.json(properties);
};

exports.getUserProperties = async (req, res) => {
  const properties = await Property.find({ userId: req.userId });
  res.json(properties);
};
