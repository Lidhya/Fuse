const UserModel = require("../models/userModel");
const PostModel = require("../models/PostModel");
const { USER_COLLECTION, POST_COLLECTION } = require("../config/collections");
const { validatePost } = require("../validations/postValidators.js");
const NotificationModel = require("../models/Notification");
const { uploadFile, S3delete } = require("../s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

module.exports = {
  getPost: async (req, res) => {
    try {
      PostModel.findById(req.params.id)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserPosts: (req, res) => {
    try {
      PostModel.find({ userId: req.params.userId })
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((err) => res.status(500).json(err));
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createPost: async (req, res) => {
    const { error, value } = validatePost(req.body);
    if (error) return res.status(422).json(error.details);
    try {
      if (req.file) {
        const file = req.file;
        const result = await uploadFile(file);
        await unlinkFile(file.path);
        req.body.url = result.Location;
        req.body.key = result.Key;
      }
      req.body.userId = req.params.id;
      PostModel.create(req.body)
        .then((response) => res.status(200).json("Post created successfully"))
        .catch((err) => res.status(500).json(err.message));
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  updatePost: async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.postId);
      const { userId, newDescription } = req.body;
      if (post.userId === userId) {
        post
          .updateOne({ $set: { description: newDescription } })
          .then(() => res.status(200).json("Post updated successfully"))
          .catch((err) => res.status(500).json(err.message));
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.postId);
      if (post.userId === req.userId) {
        S3delete(post.key)
          .then(() => {
            post
              .deleteOne()
              .then((response) =>
                res.status(200).json("Post deleted successfully")
              )
              .catch((error) => res.status(500).json(error));
          })
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(403).json("You can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  likeDislike: async (req, res) => {
    try {
      const post = await PostModel.findById(req.body.postId);
      if (!post.likes.includes(req.params.id)) {
        post
          .updateOne({ $push: { likes: req.params.id } })
          .then((response) => {
            if (post.userId != req.params.id) {
              NotificationModel.create({
                userId: post.userId,
                emiterId: req.params.id,
                text: "liked your post.",
                postId: req.body.postId,
              })
                .then((response) => res.status(200).json("post liked"))
                .catch((error) => res.status(500).json(error));
            } else res.status(200).json("post liked");
          })
          .catch((error) => res.status(500).json(error.message));
      } else {
        post
          .updateOne({ $pull: { likes: req.params.id } })
          .then((response) => {
            if (post.userId != req.params.id) {
              NotificationModel.deleteOne({
                userId: post.userId,
                emiterId: req.params.id,
                text: "liked your post.",
                postId: req.body.postId,
              })
                .then((response) => res.status(200).json("post disliked"))
                .catch((error) => res.status(500).json(error));
            } else res.status(200).json("post liked");
          })
          .catch((error) => res.status(500).json(error.message));
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  timelinePosts: async (req, res) => {
    try {
      const currentUser = await UserModel.findById(req.params.id);
      const userPosts = await PostModel.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return PostModel.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
