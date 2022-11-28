const router = require("express").Router();
const { addMessage, getMessage } = require('../controllers/messageControllers')


//add
router.post("/", addMessage);

//get
router.get("/:conversationId", getMessage);

module.exports = router;
