const router = require("express").Router();
const { createPost, updatePost, deletePost, likeDislike, getPost, timelinePosts } = require('../controllers/postControllers')
const {verifyJWT}=require('../middlewares/jwtAuth')


//create a post
router.post("/create/:id",verifyJWT, createPost);

//update a post
router.put("/update/:id",verifyJWT, updatePost);

//delete a post
router.delete("/delete/:id",verifyJWT, deletePost);

//like / dislike a post
router.put("/like/:id", likeDislike);

//get a post
router.get("/get/:id", getPost);

//get timeline posts
router.get("/timeline", timelinePosts);

module.exports = router;