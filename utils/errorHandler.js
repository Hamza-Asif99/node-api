
const ERROR_CODES={
    //mongoose duplicate primary key error code
    DUPLICATE: {
        value:"11000",
        message:"This ID already exists"
    },
    //100 series code dealing with invalid ids
    EMP_ID_NOT_FOUND:{
        value:"100",
        message:"Employee with this ID not found"
    },
    DEPT_ID_NOT_FOUND:{
        value :"101",
        message: "Department with this ID not found"
    }
}

function errorHandler(err, req, res, next){
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