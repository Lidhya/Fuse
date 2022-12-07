const router = require("express").Router();
const { verifyJWT } = require("../middlewares/jwtAuth");
const { verifyUser } = require("../middlewares/userIdCheck");

const {
  getNotifications,
  updateNotifications,
} = require("../controllers/notificationControllers");

//get all notifications
router.get("/:id", verifyJWT, verifyUser, getNotifications);

//update notifications
router.put("/:id", verifyJWT, verifyUser, updateNotifications);

module.exports = router;
