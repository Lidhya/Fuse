const router=require('express').Router()
const {verifyJWT}=require('../middlewares/jwtAuth')
const {getComments}=require('../controllers/commentControllers')

router.get('/comments',verifyJWT, getComments);