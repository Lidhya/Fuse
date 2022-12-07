const userModel = require("../models/userModel");
const NotificationModel = require("../models/Notification");
const bcrypt = require("bcrypt");
const { validateUpdate } = require("../validations/profileUpdateValidators");
const { uploadFile, S3delete } = require("../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

module.exports = {
  getUser: async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userId);
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      userModel
        .find(
          { _id: { $ne: req.params.id } },
          "_id fname lname username profilePicture"
        )
        .then((response) => res.status(200).json(response));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  userUpdate: async (req, res) => {
    const { error, value } = validateUpdate(req.body);
    if (error) return res.status(422).json(error.details);
    const { _id, password, ...details } = value;
      try {
        userModel
          .findOne({ _id: { $ne: _id }, username: details.username })
          .then(async (userCheck) => {
            if (userCheck?.username)
              return res.status(422).json("Username already in use");
            const currentUser = await userModel.findById(_id);
            bcrypt
              .compare(value.password, currentUser.password)
              .then((status) => {
                if (status) {
                  userModel
                    .findByIdAndUpdate(_id, { $set: details })
                    .then((response) =>
                      res.status(200).json("Successfully updated")
                    )
                    .catch((error) => res.status(501).json(error.message));
                } else return res.status(403).json("Incorrect password");
              })
              .catch((error) => res.status(501).json(error.message));
          })
          .catch((error) => res.status(501).json(error.message));
      } catch (err) {
        return res.status(500).json(err);
      }
  },

  profileUpdate: async (req, res) => {
    try {
      if (req.file) {
        const user = await userModel.findById(req.params.id, "profilePicture");
        if (user?.profilePicture) {
          const key = user.profilePicture.split("/")[3];
          await S3delete(key);
        }
        const file = req.file;
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        const newProfile = { profilePicture: result.Location };
        userModel
          .findByIdAndUpdate(req.params.id, { $set: newProfile })
          .then((response) => res.status(200).json("Successfully updated"))
          .catch((error) => res.status(403).json(error));
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  coverUpdate: async (req, res) => {
    try {
      if (req.file) {
        const user = await userModel.findById(req.params.id, "coverPicture");
        if (user?.coverPicture) {
          const key = user.coverPicture.split("/")[3];
          await S3delete(key);
        }
        const file = req.file;
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        const newCover = { coverPicture: result.Location };
        userModel
          .findByIdAndUpdate(req.params.id, { $set: newCover })
          .then((response) => res.status(200).json("Successfully updated"))
          .catch((error) => res.status(403).json(error));
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getSuggestions: async (req, res) => {
    try {
      const currentUserId = req.params.id;
      userModel
        .find(
          { _id: { $ne: currentUserId }, followers: { $nin: [currentUserId] } },
          "-password"
        )
        .then((response) => {
          res.status(200).json(response);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  userDelete: async (req, res) => {
      try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
  },

  followUnfollow: async (req, res) => {
    const currentUserId = req.body.currentUser;
    const userId = req.params.userId;
    if (currentUserId !== userId && currentUserId === req.userId) {
      try {
        const user = await userModel.findById(userId);
        const currentUser = await userModel.findById(currentUserId);
        if (
          user.followers.includes(currentUserId) &&
          currentUser.followings.includes(userId)
        ) {
          user
            .updateOne({ $pull: { followers: currentUserId } })
            .then(() => {
              currentUser
                .updateOne({ $pull: { followings: userId } })
                .then(() => {
                  NotificationModel.deleteOne({
                    userId: userId,
                    emiterId: currentUserId,
                    text: "started following you.",
                  }).then(() =>
                    res.status(200).json("User has been unfollowed")
                  );
                })
                .catch((error) => res.status(500).json(error));
            })
            .catch((error) => res.status(500).json(error));
        } else {
          user
            .updateOne({ $push: { followers: currentUserId } })
            .then(() => {
              currentUser
                .updateOne({ $push: { followings: userId } })
                .then(() => {
                  NotificationModel.create({
                    userId: userId,
                    emiterId: currentUserId,
                    text: "started following you.",
                  })
                    .then((response) =>
                      res.status(200).json("User has been followed")
                    )
                    .catch((error) => res.status(500).json(error));
                })
                .catch((error) => res.status(500).json(error));
            })
            .catch((error) => res.status(500).json(error));
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  },

  getFollowers: async (req, res) => {
    try {
      userModel
        .findById(req.params.userId)
        .then(async (currentUser) => {
          const followers = await Promise.all(
            currentUser.followers.map((followerId) => {
              return userModel.findOne(
                { _id: followerId },
                " _id fname lname profilePicture followers username"
              );
            })
          );
          res.status(200).json(followers);
        })
        .catch((error) => res.status(500).json(error));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getFollowings: async (req, res) => {
    try {
      userModel
        .findById(req.params.userId)
        .then(async (currentUser) => {
          const followings = await Promise.all(
            currentUser.followings.map((followingId) => {
              return userModel.findOne(
                { _id: followingId },
                " _id fname lname profilePicture followers username"
              );
            })
          );
          res.status(200).json(followings);
        })
        .catch((error) => res.status(500).json(error));
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
