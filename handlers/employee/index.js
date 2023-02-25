const {Employee} = require('../models')
const helperFunctions = require('../helpers')
const {ERROR_CODES} = require('../utils').codes
const {tokenManagement} = require('../utils')
//auth handlers

async function handleLogin(){

    let data={}
    try{

        let user = {
            userName: "hamza",
            userRole: "admin",
            userEmail: "hamza@hamza.com"
        }

        let token = tokenManagement.createToken(user)
        data.token = token
        return data

    }catch(err){
        data.error = err
        return data
    }

}


async function handleGetAllEmployees(page, limit ){

    let data ={}
    try{

        data = await helperFunctions.addPagesData({},page,limit)

        //using Model.find() with no filters to fetch all records
        //set a limit on how many records to fetch at once
        // skip value determines how many records to skip (not provide in the response)
        if(page <= 0){
            data.results = {}
        }
        else{

            data.results = await Employee.find({},{_id:0})
                .limit(limit*1)
                .skip((page-1)*limit)
        }

        return data
    }catch(err){
        data.error = err
        return data
    }
}

async function handleAddEmployee(dataToAdd){

    let result = {}
    try{
        //inserting the record into the db
        let newEmployee = new Employee(dataToAdd)
        result = await newEmployee.save()

        return result
    }catch(err){
        result.error = err
        return result
    }
}

async function handleUpdateEmployee(id, data){
    let result ={}

    try{
        //find employee matching the params id and update it
        // the {new:true} parameter is used to return the updated doc instead of the original one

        let doc = await Employee.findOneAndUpdate({empID:id}, data , {new:true, runValidators:true})

        // if no doc returned that means that no employee exists with that id
        if(!doc){
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)

            result.error = {}
            result.error.code = ERROR_CODES.EMP_ID_NOT_FOUND.value
            return result
        }
        else{
            return doc
        }

    }catch(err){
        result.error = err
        return result
    }
}

async function handleGetEmployee(id){
    let result = {}
    try{
        //using Model.findOne to find employee with given id
        let data = await Employee.findOne({empID: id},{_id:0})
        //if data is null, that means the employee could not be found
        if(!data){
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)
            result.error = {}
            result.error.code = ERROR_CODES.EMP_ID_NOT_FOUND.value

            return result
        }
        else{
            return data
        }
    }catch(err){
        result.error = err
        return result
    }

}

async function handleDeleteEmployee(id){
    let data = {}
    try{
        //using Model.deleteOne with the given ID
        data = await Employee.deleteOne({empID:id})

        //the deleteOne method gives back a object with deletedCount attribute
        // if it is equal to 0, that means the document was not found
        // and hence could not be deleted
        if(!data.deletedCount) {
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)
            data.error = {}
            // data.error.code = "100"
            data.error.code = ERROR_CODES.EMP_ID_NOT_FOUND.value

        }
        return data
    }catch(err){
        data.error = err
        return data
    }
}

async function handleGetDepartmentEmployees(deptID,page,limit){
    let data = {}
    try{

        data = await helperFunctions.addPagesData({empDept:deptID},page,limit)

        //using Model.find with the given filter to only fetch employees of that department
        if(page <= 0){
            data.results = {}
            return data
        }
        else{

            data.results = await Employee.find({empDept:deptID},{_id:0})
                .limit(limit*1)
                .skip((page-1)*limit)
        }

        //checking if the department with given id exists or not
        if(!helperFunctions.checkDepartmentValidity(deptID)){
            //throwing error with code 101, this code is responsible for "department doesn't exist"
            // (see error handler ERROR_CODES)
            data.error = {}
            data.error.code = ERROR_CODES.DEPT_ID_NOT_FOUND.value

            // next(error)

        }
        return data


    }catch(err){
        data.error = err
        return data
        // next(err)
    }
}

module.exports ={
    handleGetAllEmployees,
    handleAddEmployee,
    handleUpdateEmployee,
    handleGetEmployee,
    handleDeleteEmployee,
    handleGetDepartmentEmployees,
    handleLogin,
}