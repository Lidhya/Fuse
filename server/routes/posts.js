const router = require("express").Router();
const { createPost, updatePost, deletePost, likeDislike, getPost, timelinePosts, getCurrentUserPosts } = require('../controllers/postControllers')
const {verifyJWT}=require('../middlewares/jwtAuth')
const multer=require('multer')
const path=require('path')

const storage = multer.diskStorage({
    destination: './public/posts/',
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({
    storage: storage,
  });

//get timeline posts
router.get("/posts/:id", timelinePosts);

// get current users posts
router.get("/:id", getCurrentUserPosts);

//create a post
router.post("/create-post/:id",verifyJWT, upload.single('file'), createPost);

//update a post
router.put("/update/:id",verifyJWT, updatePost);

//delete a post
router.delete("/delete/:id",verifyJWT, deletePost);

//like / dislike a post
router.put("/like/:id", verifyJWT, likeDislike);

//get a post
router.get("/get/:id", verifyJWT, getPost);



module.exports = router;