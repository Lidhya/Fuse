const router = require('express').Router();
const { userUpdate, userDelete, getUser, follow, unfollow  } = require('../controllers/userControllers')


//update user
router.put("/update/:id", userUpdate);

//delete user
router.delete("/delete/:id", userDelete);

//get a user
router.get("/get/:id", getUser );

//follow a user
router.put("/follow/:id", follow);

//unfollow a user
router.put("/unfollow/:id", unfollow);

module.exports = router;
