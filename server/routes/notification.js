const router = require('express').Router();
const { verifyJWT } = require('../middlewares/jwtAuth');
const {getNotifications, updateNotifications } = require('../controllers/notificationControllers')


//get all notifications
router.get('/:id', verifyJWT, getNotifications)

//add notifications
router.put('/:id', verifyJWT, updateNotifications)



module.exports = router;