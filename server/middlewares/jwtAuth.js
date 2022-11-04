const jwt = require('jsonwebtoken');

module.exports.verifyJWT = (req, res, next) => {
    let authHeader=req.headers.authorization
    if (!authHeader) {
        res.status(401).json({error:"token not provided"});
    } else {
    const token = authHeader.split(" ")[1];
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "you are failed to authenticate"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};