const jwt = require("jsonwebtoken");

module.exports.verifyJWT = (req, res, next) => {
  let authHeader = req.headers?.authorization;
  if (!authHeader) {
    res.status(401).json({ auth: false, message: "Token not provided" });
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ auth: false, message: "you are failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
