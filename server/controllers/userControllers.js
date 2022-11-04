const userModel=require('../models/userModel');
const bcrypt=require('bcrypt')

module.exports.userUpdate=async (req, res) => {
    if (req.body.userId === req.params.id ) {
      if (req.body.password) {
        try {
          req.body.password = await bcrypt.hash(req.body.password, 10);
        } catch (err) {
          return res.status(500).json(err);
        }
      }
      try {
        const user = await userModel.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can update only your account!");
    }
  }

  module.exports.userDelete= async(req, res) => {
    if (req.body.userId === req.params.id ) {
      try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  }

  module.exports.getUser=async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  module.exports.follow=async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await userModel.findById(req.params.id);
        const currentUser = await userModel.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  }

  module.exports.unfollow= async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await userModel.findById(req.params.id);
        const currentUser = await userModel.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  }