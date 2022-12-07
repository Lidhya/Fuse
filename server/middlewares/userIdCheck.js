module.exports.verifyUser = (req, res, next) => {
  if (req.params.id === req.userId) {
    next();
  } else res.status(403).json("You are not authorized");
};
