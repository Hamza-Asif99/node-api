const jwt = require('jsonwebtoken')
const config = require('../config')

function createToken(user){
    let token = jwt.sign({user},config.token_secret, {expiresIn:config.tokenExpiry})
    return token
}
function verifyToken(req, res, next){

    let {ACCESS_TOKEN} = req.cookies
    if(!ACCESS_TOKEN){
        req.unauthenticated = true
        next()
        // next(new Error())
    }
    else{

        let decoded = jwt.verify(ACCESS_TOKEN,config.token_secret )
        if(decoded.user){
            req.user = decoded.user
            next()
        }else{
            req.unauthenticated = true
            // next(new Error())
        }
    }
}

module.exports = {
    verifyToken,
    createToken
}
