const router = require('express').Router();
const { userLogin, userRegister } = require('../controllers/authControllers')

//register
router.post("/register", userRegister);
//login
router.post("/login", userLogin);




module.exports = router;