const router=require('express').Router()
const {verifyJWT}=require('../middlewares/jwtAuth')
const {getComments, addComment}=require('../controllers/commentControllers')

router.get('/all-comments/:postId',verifyJWT, getComments);
router.post('/add-comment/:postId',verifyJWT, addComment);

module.exports=router