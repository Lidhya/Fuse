const UserModel = require('../models/userModel');
const PostModel = require("../models/PostModel");
const { validateComment } = require('../validations/commentValidators');

module.exports = {
    getComments: (req, res) => {
        try {
            const postId = req.params.postId
            PostModel.findOne({ _id: postId }, "comments")
                .then(async ({ comments }) => {
                    const commentDetails = await Promise.all(
                        comments.map(async (comment) => {
                            let author = await UserModel.findOne({ _id: comment.authorId }, "fname lname profilePicture ")
                            return  {...comment._doc, ...author._doc}
                        })
                    );
                    console.log(commentDetails);
                    res.status(200).json(commentDetails)
                })
                .catch((error) => { console.log(error); res.status(500).json(error.message); })
        } catch (error) {
            console.log(error);
            res.status(500).json(error.message)
        }
    },

    addComment: (req, res) => {
        try {
            const { error, value } = validateComment(req.body)
            if (error) return res.status(422).json(error.details)
            const postId = req.params.postId
            PostModel.updateOne({ _id: postId }, { $addToSet: { comments: value } })
                .then((response) => res.status(200).json(response))
                .catch((error) => res.status(500).json(error.message))
        } catch (error) {
            res.status(500).json(error.message)
        }
    }

}