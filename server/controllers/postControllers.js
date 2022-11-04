const UserModel = require('../models/userModel');
const PostModel = require("../models/PostModel");
const { validatePost } = require('../validations/postValidators.js');

module.exports.getPost=async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

module.exports.createPost=async (req, res) => {
  const { error, value } = validatePost(req.body)
        if (error) {
            return res.status(422).json({ errors: error.details })
        }
        try {
          console.log(req.body);
      const newPost = PostModel.create(req.body);
      res.status(200).json("Post created successfully");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  module.exports.updatePost=async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("the post has been updated");
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  module.exports.deletePost=async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  module.exports.likeDislike=async (req, res) => {
    try {
      const post = await PostModel.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

    module.exports.timelinePosts=async (req, res) => {
    try {
      const currentUser = await UserModel.findById(req.body.userId);
      const userPosts = await PostModel.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.following.map((friendId) => {
          return PostModel.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  }

  