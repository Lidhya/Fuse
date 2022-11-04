const router = require("express").Router();
const { createPost  } = require('../controllers/postControllers')


//create a post
router.post("/:id", createPost);

//update a post
router.put("/:id", updatePost);

//delete a post
router.delete("/:id", deletePost);

//like / dislike a post
router.put("/:id/like", likeDislike);

//get a post
router.get("/:id", getPost);

//get timeline posts

router.get("/timeline/all", timelinePosts);

module.exports = router;