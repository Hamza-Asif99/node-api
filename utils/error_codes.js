
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

module.exports = {ERROR_CODES}