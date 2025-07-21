const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = function fetchUser(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Invalid token format, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    res.status(403).json({ error: "Token is not valid or expired" });
  }
};
