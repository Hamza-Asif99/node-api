const Employee = require("../models/employeeSchema");
const checkDepartmentValidity = require("../helpers/checkDepartmentValidity");

async function handleGetAllEmployees(){

    let data ={}
    try{
        //using Model.find() with no filters to fetch all records
        data = await Employee.find({})
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

        let doc = await Employee.findOneAndUpdate({empID:id}, data , {new:true})

        // if no doc returned that means that no employee exists with that id
        if(!doc){
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)

            result.error = {}
            result.error.code = "100"

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
        let data = await Employee.findOne({empID: id})
        //if data is null, that means the employee could not be found
        if(!data){
            // let error = new Error()
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)
            result.error = {}
            result.error.code = "100"
            return result
        }
        else{
            return data
        }
    }catch(err){
        result.error = err
        return result
        // next(err)
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
            data.error.code = "100"

        }
        return data
    }catch(err){
        data.error = err
        return data
    }
}

async function handleGetDepartmentEmployees(deptID){
    let data = {}
    try{
        //using Model.find with the given filter to only fetch employees of that department
        data = await Employee.find({empDept:deptID})

        //checking if the department with given id exists or not
        if(!checkDepartmentValidity(deptID)){
            let error = new Error()
            //throwing error with code 101, this code is responsible for "department doesn't exist"
            // (see error handler ERROR_CODES)
            data.error = {}
            data.error.code = "101"

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
    handleGetDepartmentEmployees
}