const router = require("express").Router();

//register
router.get("/", (req, res)=>{
    res.send("Welcome to Fuse API, you're good to go")
});

module.exports = router;
