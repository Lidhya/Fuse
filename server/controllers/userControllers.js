const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const { validateUpdate } = require('../validations/profileUpdateValidators');


module.exports = {

  getUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  userUpdate: async (req, res) => {
    const { error, value } = validateUpdate(req.body)
    if (error) return res.status(422).json(error.details)
    const { _id, ...details } = value
    if (_id === req.params.id) {
      try {
        userModel.findOne({ _id: { $ne: _id }, username: details.username })
          .then(async (user) => {
            console.log(user);
            if (user?.username) return res.status(422).json({ message: "Username already in use" })
            details.password = await bcrypt.hash(details.password, 10)
            userModel.findByIdAndUpdate(_id, { $set: details })
              .then((response) => res.status(200).json("Successfully updated"))
              .catch((error) => res.status(501).json(error.message))
          }).catch((error) => res.status(501).json(error.message))
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  },

  getSuggestions: async (req, res) => {
    try {
      const currentUserId = req.params.id
      userModel.find({ _id: { $ne: currentUserId }, followers: { $nin: [currentUserId] } }, "-password")
        .then((response) => {
          console.log(response);
          res.status(200).json(response);
        })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  userDelete: async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  },

  followUnfollow: async (req, res) => {
    const currentUserId = req.body.currentUser
    const userId = req.params.id
    if (currentUserId !== userId) {
      try {
        const user = await userModel.findById(userId);
        const currentUser = await userModel.findById(currentUserId);
        if (user.followers.includes(currentUserId) && currentUser.followings.includes(userId)) {
          user.updateOne({ $pull: { followers: currentUserId } })
            .then(() => {
              currentUser.updateOne({ $pull: { followings: userId } })
                .then(() => res.status(200).json("User has been unfollowed"))
                .catch((error) => res.status(500).json(error))
            })
            .catch((error) => res.status(500).json(error))
        } else {
          user.updateOne({ $push: { followers: currentUserId } })
            .then(() => {
              currentUser.updateOne({ $push: { followings: userId } })
                .then(() => res.status(200).json("User has been followed"))
                .catch((error) => res.status(500).json(error))
            })
            .catch((error) => res.status(500).json(error))
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  }

}
