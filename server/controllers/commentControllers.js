const UserModel = require("../models/userModel");
const PostModel = require("../models/PostModel");
const { validateComment } = require("../validations/commentValidators");

module.exports = {
  getComments: (req, res) => {
    try {
      const postId = req.params.postId;
      PostModel.findOne({ _id: postId }, "comments")
        .then(async ({ comments }) => {
          const commentDetails = await Promise.all(
            comments.map(async (comment) => {
              let author = await UserModel.findOne(
                { _id: comment.authorId },
                "fname lname profilePicture -_id"
              );
              return { ...comment._doc, ...author._doc };
            })
          );
          res.status(200).json(commentDetails);
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  addComment: (req, res) => {
    try {
      const { error, value } = validateComment(req.body);
      if (error) return res.status(422).json(error.details);
      if(value.authorId === req.userId){ 
      const postId = req.params.postId;
      PostModel.updateOne({ _id: postId }, { $addToSet: { comments: value } })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(error.message));
      }else res.status(403).json("You are not authorized");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  deleteComment: (req, res) => {
    try {
      const postId = req.params.postId;
      const { commentId } = req.body;
      PostModel.updateOne(
        { _id: postId },
        { $pull: { comments: { _id: commentId } } }
      )
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(error.message));
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
