const router = require("express").Router();
const { verifyJWT } = require("../middlewares/jwtAuth");
const { verifyUser } = require("../middlewares/userIdCheck");

const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentControllers");

router.get("/:postId", verifyJWT, getComments);
router.post("/:postId", verifyJWT, addComment);
router.put("/delete/:postId", verifyJWT, deleteComment);

module.exports = router;
