const router = require("express").Router();
const {
  createPost,
  updatePost,
  deletePost,
  likeDislike,
  getPost,
  timelinePosts,
  getUserPosts,
} = require("../controllers/postControllers");
const { verifyJWT } = require("../middlewares/jwtAuth");
const { verifyUser } = require("../middlewares/userIdCheck");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/posts/",
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
router.get("/timeline/:id", verifyJWT, verifyUser, timelinePosts);

// get  users posts
router.get("/:userId", verifyJWT, getUserPosts);

//create a post
router.post("/create-post/:id", verifyJWT, verifyUser, upload.single("file"), createPost);

//update a post
router.put("/update/:postId", verifyJWT, updatePost);

//delete a post
router.delete("/delete/:postId", verifyJWT,  deletePost);

//like / dislike a post
router.put("/like/:id", verifyJWT, verifyUser, likeDislike);

//get a post
router.get(":/get/id", verifyJWT, getPost);

module.exports = router;
