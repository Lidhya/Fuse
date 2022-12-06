const router = require("express").Router();
const { verifyJWT } = require("../middlewares/jwtAuth");
const { addMessage, getMessage } = require("../controllers/messageControllers");

//add message
router.post("/", verifyJWT, addMessage);

//get message
router.get("/:conversationId", verifyJWT, getMessage);

module.exports = router;
