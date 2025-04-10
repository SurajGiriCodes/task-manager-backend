const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
  //Get token from cookie or auth header
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Authentication required!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
