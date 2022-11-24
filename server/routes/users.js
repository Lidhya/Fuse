const router = require('express').Router();
const { userUpdate, userDelete, getUser, follow, unfollow } = require('../controllers/userControllers')
const { verifyJWT } = require('../middlewares/jwtAuth')


//get a user
router.get("/get/:id", verifyJWT, getUser);

//update user
router.put("/update/:id", verifyJWT, userUpdate);

//delete user
router.delete("/delete/:id", verifyJWT, userDelete);

//follow a user
router.put("/follow/:id", verifyJWT, follow);

//unfollow a user
router.put("/unfollow/:id", verifyJWT, unfollow);

module.exports = router;
