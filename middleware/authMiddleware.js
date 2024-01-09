const jwt = require("jsonwebtoken");
const authConfig = require("../config/authConfig");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //BEARER TOKEN
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, "authheadererrerer");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(
    token,
    process.env.access_token,
    { algorithms: ["HS256"] },
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      req.user = decoded;
      console.log(req.user)
      next();
    }
  );
};

module.exports = authMiddleware;
