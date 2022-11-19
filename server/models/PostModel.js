const mongoose = require("mongoose");
const { POST_COLLECTION} = require('../config/collections')

const CommentSchema = new mongoose.Schema({
    authorId: {
        type: String,
        default: null,
    },
    comment: {
        type: String,
        default: null,
    },
    created_at: {
        type: Date,
        default: new Date(),
    }
})

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    location:{
        type:String,
    },
    url: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments:[CommentSchema]
  },
  { timestamps: true }
);

const PostModel = mongoose.model(POST_COLLECTION, PostSchema);
module.exports =PostModel