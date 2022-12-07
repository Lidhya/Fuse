const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  validateRegister,
  validateLogin,
} = require("../validations/authValidators");

module.exports = {
  userRegister: function (req, res) {
    try {
      const { error, value } = validateRegister(req.body);
      if (error) return res.status(422).json(error.details);
      userModel
        .findOne({ username: value.username })
        .then(async (user) => {
          if (user?.username)
            return res.status(422).json("Username already exists");
          value.password = await bcrypt.hash(value.password, 10);
          userModel
            .create(value)
            .then((response) => {
              res.status(201).json(response);
            })
            .catch((error) => {
              res.status(501).json(error.message);
            });
        })
        .catch((error) => {
          res.status(501).json(error.message);
        });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  userLogin: async function (req, res) {
    try {
      const { error, value } = validateLogin(req.body);
      if (error) return res.status(422).json({ message: error.details });
      userModel
        .findOne({ username: value.username })
        .then((user) => {
          if (user?.username) {
            const { password, ...details } = user._doc;
            bcrypt
              .compare(value.password, password)
              .then((status) => {
                if (status) {
                  const id = user._id;
                  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: "24h",
                  });
                  res
                    .status(200)
                    .json({ auth: true, token: token, user: details });
                } else res.status(403).json("Incorrect password");
              })
              .catch((error) => res.status(500).json(error.message));
          } else return res.status(500).json("User not found");
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
