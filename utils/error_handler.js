const {HTTPSTATUS} = require("./status_and_error_codes");
const ERROR_CODES = require('./status_and_error_codes').ERROR_CODES
function errorHandler(err, req, res, next){
    if(err.code){
        err.code = err.code.toString()
    }
    const error_key = getMessage(err.code, ERROR_CODES)

        res.status(HTTPSTATUS.BAD_REQUEST).send({error:ERROR_CODES[error_key].message})


}

const getMessage = (code, ERROR_CODES) => {

    let keyToSend
    const status = Object.keys(ERROR_CODES).some((key, index)=>{
        if(ERROR_CODES[key].value == code){
            keyToSend = key
        }

    })
    //if no code matches, then set a default code and show a generic message
    if(!keyToSend){
        keyToSend = "DEFAULT"
    }
    return keyToSend
}

// export default error_handler
module.exports = errorHandler