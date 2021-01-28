const jwt = require('jsonwebtoken');
const async = require("async");

// FORMAT OF TOKEN
//Authorization: Bearer <access_token>
//Verify Token
function verifyToken(req, res, next) {
    //Get auth header value

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');

        //get token from array
        const bearerToken = bearer[1];

        //set the token
        req.token = bearerToken;

        //Next middleware
        next();
    } else {
        //Forbidden
        res.sendStatus(401);
    }
}

async function verifyAdmin(req, res, next) {
    try {
        const authData = await jwt.verify(req.token, process.env.SECRETKEY);
        if (authData.token.is_role == "admin") {
            next();
        } else {
            res.status(401).json({ status: 401, msg: 'Unauthorized user.' });
        }
    } catch (e) {
        res.status(401).json({ status: 401, msg: 'Unauthorized user.' });
    }

}


module.exports = {
    verifyToken,
    verifyAdmin
}