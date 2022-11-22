const UserModel = require('../models/userModel');
const PostModel = require("../models/PostModel");

module.exports={
    getComments:(req, res)=>{
       const postId=req.params.id
        PostModel.findById({ _Id:postId })
        .then((response)=>res.status(200).json(response))
        .catch((error)=> res.status(500).json(error.message))
    }
}