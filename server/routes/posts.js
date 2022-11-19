const router = require("express").Router();
const { createPost, updatePost, deletePost, likeDislike, getPost, timelinePosts } = require('../controllers/postControllers')
const {verifyJWT}=require('../middlewares/jwtAuth')
const multer=require('multer')

const upload = multer({ dest: './public/posts/' })

//get timeline posts
router.get("/posts/:id", timelinePosts);

//create a post
router.post("/create-post/:id",verifyJWT, upload.single('image'), createPost);

//update a post
router.put("/update/:id",verifyJWT, updatePost);

//delete a post
router.delete("/delete/:id",verifyJWT, deletePost);

//like / dislike a post
router.put("/like/:id", likeDislike);

//get a post
router.get("/get/:id", getPost);



module.exports = router;