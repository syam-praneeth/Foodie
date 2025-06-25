const Vendor = require("../Models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();

const secretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

const vendorController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newVendor = new Vendor({
        name,
        email,
        password: hashedPassword,
      });
      await newVendor.save();
      const token = jwt.sign({ id: newVendor._id }, secretKey, { expiresIn });
      res
        .status(201)
        .json({ message: "Vendor registered successfully", token });
    }
  } catch (error) {
    console.error("Error in vendorController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingVendor = await Vendor.findOne({ email });
    if (!existingVendor) {
      return res.status(400).json({ message: "Vendor does not exist" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingVendor.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: existingVendor._id }, secretKey, {
      expiresIn,
    });
    res.status(200).json({ message: "Vendor logged in successfully", token });
  } catch (error) {
    console.error("Error in vendorLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { vendorController, vendorLogin };
