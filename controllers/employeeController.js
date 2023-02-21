const Employee = require("../models/employeeSchema");
const checkDepartmentValidity = require("../helpers/checkDepartmentValidity")

//function responsible for getting all the employees

//an experimental route to see how it effects performance and how to tackle large queries
async function getAllEmployees (req,res,next){
    try{
        //using Model.find() with no filters to fetch all records
        let data = await Employee.find({})
        res.json(data)
    }catch(err){
        next(err)
    }
}

//function to add an employee
async function addEmployee (req,res,next){
    let data = req.body
    try{
        //inserting the record into the db
        let newEmployee = new Employee(data)
        let result = await newEmployee.save()
        res.json({success:"Doc added ", data:result})
    }catch(err){
        next(err)
    }
}

//function to update an employee
async function updateEmployee(req,res,next){
    let data = req.body

    try{
        //find employee matching the params id and update it
        // the {new:true} parameter is used to return the updated doc instead of the original one
        let doc = await Employee.findOneAndUpdate({empID:req.params.id}, data , {new:true})

        // if no doc returned that means that no employee exists with that id
        if(!doc){
            let error = new Error()
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)
            error.code = "100"
            next(error)
        }
        else{
            res.json({success:"Updated successfully"})
        }

    }catch(err){
        next(err)
    }
}

//function to get a specific employee
async function getEmployee(req,res,next){
    let {id}= req.params

    try{
        //using Model.findOne to find employee with given id
        let data = await Employee.findOne({empID: id})
        //if data is null, that means the employee could not be found
        if(!data){
            let error = new Error()
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)
            error.code = "100"
            next(error)
        }
        else{
            res.status(200).json({success:"Data Fetched Successfully ", employeeData: data})
        }
    }catch(err){
        next(err)
    }
}

//function to delete a specific employee
async function deleteEmployee(req,res,next){
    let {id} = req.params

    try{
        //using Model.deleteOne with the given ID
        let data = await Employee.deleteOne({empID:id})

        //the deleteOne method gives back a object with deletedCount attribute
        // if it is equal to 0, that means the document was not found
        // and hence could not be deleted
        if(!data.deletedCount){
            let error = new Error()
            //throwing error with code 100, this code handles "id not found error" (see error handler ERROR_CODES)
            error.code = "100"
            next(error)
        }
        else{
            res.status(200).json({success:"Employee deleted Successfully"})
        }
    }catch(err){
        next(err)
    }

}

//this function returns all employees of a given department
async function getDepartmentEmployees(req,res,next){
    let {id} = req.params

    try{
        //using Model.find with the given filter to only fetch employees of that department
        let data = await Employee.find({empDept:id})

        //checking if the department with given id exists or not
        if(!checkDepartmentValidity(id)){
            let error = new Error()
            //throwing error with code 101, this code is responsible for "department doesn't exist"
            // (see error handler ERROR_CODES)
            error.code = "101"
            next(error)

        }
        //if department is valid and array is empty, that means no employees exist in that department
        else if(!data.length){
            res.status(200).json({success:"Add Employees to this department to view their data"})
        }
        else{
            res.status(200).json({success:"Records Fetched ", deptEmployees:data})
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    getEmployee,
    deleteEmployee,
    getDepartmentEmployees
}