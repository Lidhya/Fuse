const router = require('express').Router();
const { userUpdate, userDelete, getUser, followUnfollow, getSuggestions } = require('../controllers/userControllers')
const { verifyJWT } = require('../middlewares/jwtAuth')


//get a user
router.get("/get/:id", verifyJWT, getUser);

//get a user
router.get("/suggestions/:id", verifyJWT, getSuggestions);

//update user
router.put("/update/:id", verifyJWT, userUpdate);

//delete user
router.delete("/delete/:id", verifyJWT, userDelete);

//follow a user
router.put("/follow-unfollow/:id", verifyJWT, followUnfollow);



module.exports = router;
