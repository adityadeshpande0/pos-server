const jwt = require("jsonwebtoken");
const BusinessAdmin = require("..//models/business/businessAdmin");
require("dotenv").config();

exports.verifyBusinessAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    jwt.sign(
      { admin: decoded.admin },
      process.env.JWT_SECRET,
      { expiresIn: "10d" },
      (err, token) => {
        if (err) throw err;
        req.authToken = token;
      }
    );
    const businessAdmin = await BusinessAdmin.findById(decoded.admin.id);

    if (!businessAdmin) {
      return res.status(404).json({ message: "BusinessAdmin not found" });
    }

    // Attach admin info to request
    req.businessAdmin = businessAdmin;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
