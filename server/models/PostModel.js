const mongoose = require("mongoose");

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
        default:""
    },
    url: {
      type: String,
      default:""
    },
    likes: {
      type: Array,
      default: [],
    },
    comments:[CommentSchema],
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        default: null,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports =PostModel