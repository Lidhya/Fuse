const router = require("express").Router();
const { createPost  } = require('../controllers/postControllers')


//create a post
router.post("/create/:id", createPost);

//update a post
router.put("/update/:id", updatePost);

//delete a post
router.delete("/delete/:id", deletePost);

//like / dislike a post
router.put("/like/:id", likeDislike);

//get a post
router.get("/get/:id", getPost);

//get timeline posts
router.get("/timeline/all", timelinePosts);

module.exports = router;