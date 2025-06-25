const firmModel = require("../Models/Firm");
const vendorModel = require("../Models/Vendor");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;
const firmController = async (req, res) => {
  const { name, category, region, offer, image } = req.body;
  try {
    const existingFirm = await firmModel.findOne({ name });
    if (existingFirm) {
      return res.status(400).json({ message: "Firm already exists" });
    }
    const newFirm = new firmModel({
      name,
      category,
      region,
      offer,
      image,
      vendor: req.vendor._id,
    });
    const sfirm = await newFirm.save();
    req.vendor.firm = sfirm._id;
    await req.vendor.save();
    const token = jwt.sign({ id: newFirm._id }, secretKey, { expiresIn });
    res.status(201).json({ message: "Firm registered successfully", token });
  } catch (error) {
    console.error("Error in firmController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = firmController;
