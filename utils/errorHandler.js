const {ERROR_CODES} = require('./error_codes')

function errorHandler(err, req, res, next){

    console.log(ERROR_CODES)
    //if user tries to assign an already existing id to a new employee
    // this error is thrown
    if(err.code){
        err.code = err.code.toString()
    }
    console.log(err.code)
    switch (err.code){
        case ERROR_CODES.DUPLICATE.value:
            res.status(400).send({error: ERROR_CODES.DUPLICATE.message})
            break
        case ERROR_CODES.EMP_ID_NOT_FOUND.value:
            res.status(400).send({error: ERROR_CODES.EMP_ID_NOT_FOUND.message})
            break
        case ERROR_CODES.DEPT_ID_NOT_FOUND.value:
            res.status(400).send({error: ERROR_CODES.DEPT_ID_NOT_FOUND.message})
            break
        default:
            res.status(500).send('Something broke!')
            break
    }
}

// export default errorHandler
module.exports = errorHandler