const Employee = require("../models/employeeSchema");
const employeeHandler = require("../handlers/employeeHandler")

//function responsible for getting all the employees

//an experimental route to see how it effects performance and how to tackle large queries
async function getAllEmployees (req,res,next){

    let data = await employeeHandler.handleGetAllEmployees()

    if(data.error){
        next(data.error)
    }else{
        res.status(200).json({success:"Data Fetched Successfully", data: data})
    }

}

//function to add an employee
async function addEmployee (req,res,next){
    let data = req.body

    let result =  await employeeHandler.handleAddEmployee((data))

    if(result.error){
        next(result.error)
    }
    else{
        res.status(201).json({success:"Data Added"})
    }
}

//function to update an employee
async function updateEmployee(req,res,next){
    let {body} = req
    let {id} = req.params

    let result = await employeeHandler.handleUpdateEmployee(id, body)

    if(result.error){
        next(result.error)
    }
    else{
        res.json({success:"Updated successfully"})

    }
}

//function to get a specific employee
async function getEmployee(req,res,next){
    let {id}= req.params

    let result = await employeeHandler.handleGetEmployee(id)
    if(result.error){
        next(result.error)
    }else{
        res.status(200).json({success:"Data Fetched Successfully ", employeeData: result})
    }
}

//function to delete a specific employee
async function deleteEmployee(req,res,next){
    let {id} = req.params

    let data = await employeeHandler.handleDeleteEmployee(id)

    if(data.error){
        next(data.error)
    }
    else{
        res.status(200).json({success:"Employee deleted Successfully"})
    }

}

//this function returns all employees of a given department
async function getDepartmentEmployees(req,res,next){
    let {id} = req.params

    let data = await employeeHandler.handleGetDepartmentEmployees(id)

    if(data.error){
        next(data.error)
    }
    //if department is valid and array is empty, that means no employees exist in that department
    else if(!data.length){
        res.status(200).json({success:"Add Employees to this department to view their data"})
    }
    else{
        res.status(200).json({success:"Records Fetched ", deptEmployees:data})
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