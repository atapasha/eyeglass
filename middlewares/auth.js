const jwt = require('jsonwebtoken')
require('dotenv').config()
function auth(req, res, next) {
    const token = req.headers['x-auth']
    if (!token) {
        return res.send('no token is provided')
    }
    else {
        jwt.verify(token, process.env.PASSWORD_HASH_KEY, (err, decoded) => {

            if (err) res.status(401).send('provided token not verified')
            req.user = decoded

            next()
            console.log(decoded)


        })
    }



}


module.exports = auth