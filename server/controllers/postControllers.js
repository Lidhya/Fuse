const UserModel = require('../models/userModel');
const PostModel = require("../models/PostModel");
const { USER_COLLECTION, POST_COLLECTION} = require('../config/collections')
const { validatePost } = require('../validations/postValidators.js');
const {uploadFile, getFileStream}=require('../s3')


module.exports={
  getPost:async (req, res) => {
    try {
      PostModel.findById(req.params.id)
      .then((response)=>res.status(200).json(post))
      .catch((err)=>res.status(500).json(err))
    } catch (err) {
      res.status(500).json(err);
    }
  },

createPost:async (req, res) => {
  const { error, value } = validatePost(req.body)
        if (error)   return res.status(422).json(error.details)
        try {
          const imgFile=req.file
          const result= await uploadFile(imgFile)
          console.log(imgFile);
          console.log(result);
          req.body.userId=req.params.id
      PostModel.create(req.body)
      .then((response)=>res.status(200).json("Post created successfully"))
      .catch((err)=>res.status(500).json(err.message))
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  updatePost:async (req, res) => {
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
  },

  deletePost:async (req, res) => {
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
  },

  likeDislike:async (req, res) => {
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
  },

    timelinePosts:async (req, res) => {
    try {
      const currentUser = await UserModel.findById(req.params.id);
      const userPosts = await PostModel.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return PostModel.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))

      //lidhya way
      // UserModel.aggregate([
      //   {$match:{_id:req.params.id}},
      //   {
      //     $lookup: {
      //         from: POST_COLLECTION,
      //         localField: 'followings',
      //         foreignField: '_id',
      //         as: 'f'
      //     }
      // },
      // ])

    } catch (err) {
      res.status(500).json(err);
    }
  }

}