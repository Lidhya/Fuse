const router = require('express').Router();
const { userLogin, userRegister } = require('../controllers/authControllers')
const {verifyJWT}=require('../middlewares/jwtAuth')


// router.get('/isUserAuth', verifyJWT , (req, res) => {
//     res.send("You are authenticated Congrats:")
// })

//register
router.post("/register", userRegister);
//login
router.post("/login", userLogin);




module.exports = router;