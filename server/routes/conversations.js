const router = require("express").Router();
const { verifyJWT } = require("../middlewares/jwtAuth");
const {
  addNewConvo,
  getUserConvo,
  getBothConvo,
} = require("../controllers/conversationControllers");

//new conv
router.post("/", verifyJWT, addNewConvo);

//get conv of a user
router.get("/:id", verifyJWT, getUserConvo);

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", verifyJWT, getBothConvo);

module.exports = router;
