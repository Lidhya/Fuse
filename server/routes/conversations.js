const router = require("express").Router();
const { addNewConvo, getUserConvo, getBothConvo } = require('../controllers/conversationControllers')

//new conv
router.post("/", addNewConvo);

//get conv of a user
router.get("/:userId", getUserConvo);

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", getBothConvo);

module.exports = router;
