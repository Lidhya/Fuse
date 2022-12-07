const router = require("express").Router();
const {
  userUpdate,
  getAllUsers,
  userDelete,
  getUser,
  followUnfollow,
  getSuggestions,
  profileUpdate,
  coverUpdate,
  getFollowers,
  getFollowings,
} = require("../controllers/userControllers");
const { verifyJWT } = require("../middlewares/jwtAuth");
const { verifyUser } = require("../middlewares/userIdCheck");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/user/",
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

//get a user
router.get("/get/:userId", verifyJWT, getUser);

//get all users
router.get("/all-users/:id", verifyJWT, getAllUsers);

//get Suggestions
router.get("/suggestions/:id", verifyJWT, getSuggestions);

//update user
router.put("/update/:id", verifyJWT, verifyUser, userUpdate);

//update profile picture
router.put(
  "/profile-update/:id",
  verifyJWT,
  upload.single("profile"),
  profileUpdate
);

//update cover picture
router.put("/cover-update/:id", verifyJWT, verifyUser, upload.single("cover"), coverUpdate);

//delete user
router.delete("/delete/:id", verifyJWT, verifyUser, userDelete);

//follow a user
router.put("/follow-unfollow/:userId", verifyJWT, followUnfollow);

//followers list
router.get("/followers/:userId", verifyJWT, getFollowers);

//followings list
router.get("/followings/:userId", verifyJWT, getFollowings);

module.exports = router;
