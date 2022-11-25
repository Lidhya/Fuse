const router = require('express').Router();
const { userUpdate, userDelete, getUser, followUnfollow, unfollow } = require('../controllers/userControllers')
const { verifyJWT } = require('../middlewares/jwtAuth')


//get a user
router.get("/get/:id", verifyJWT, getUser);

//update user
router.put("/update/:id", verifyJWT, userUpdate);

//delete user
router.delete("/delete/:id", verifyJWT, userDelete);

//follow a user
router.put("/follow-unfollow/:id", verifyJWT, followUnfollow);

//unfollow a user
router.put("/unfollow/:id", verifyJWT, unfollow);

module.exports = router;
