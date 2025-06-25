const Vendor = require("../Models/Vendor");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    //for Rest API, the token is usually sent in the Authorization header
  //const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    req.vendor = vendor; // Attach the vendor to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = verifyToken;
