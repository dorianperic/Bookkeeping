const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    
    if(req.cookies.token)
    {
        jwt.verify(accessToken, process.env.ACCESSTOKENSECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            console.log(user);

            req.user = user;
            next();
        });
    }else {
        res.sendStatus(401);
    }
};
