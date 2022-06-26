const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    token = req.cookies.token;
    
    if(token)
    {
        jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, userData) => {
            if (err) {
                return res.sendStatus(403);
            }

            console.log(userData);

            req.user = userData;
            next();
        });
    }else {
        res.sendStatus(401);
    }
};
