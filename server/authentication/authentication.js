const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    token = req.cookies.token;

    console.log(req.query.id)

    if(token)
    {
        jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, userData) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = userData;
            next();
        });
    }else {
        res.sendStatus(401);
    }
};
