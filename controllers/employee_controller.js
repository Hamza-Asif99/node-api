const employeeHandler = require("../handlers/index").employeeHandler
const {HTTPSTATUS} = require("../utils").codes

//function responsible for getting all the employees

//an experimental route to see how it effects performance and how to tackle large queries
async function getAllEmployees (req,res,next){

    //some default values for the page and limit values in case the user does not provide
        const {page = 1} = req.query
    //check to see if limit values are within a certain bound
            let limit = 20

            //call the handler if the check pass
            //call handler with the page and limit values

            let data = await employeeHandler.handleGetAllEmployees(page, limit)
            //if empty data array found, this mean that page number query param is too high
            if(!data.results.length ){
                res.status(HTTPSTATUS.OK).json({message: "Page Does Not Exist"})
            }
            else if(data.error){
                next(data.error)
            }else{
                res.status(HTTPSTATUS.OK).json({success:"Data Fetched Successfully", data: data})
            }

}

//function to add an employee
async function addEmployee (req,res,next){
    let {body} = req

    //handle absence of a body
    if(!Object.keys(body).length){
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).send({message:"Please send employee details"})
    }
    else{

        let result =  await employeeHandler.handleAddEmployee((body))

        if(result.error){
            next(result.error)
        }
        else{
            res.status(HTTPSTATUS.CREATED).json({success:"Data Added"})
        }
    }
}

//function to update an employee
async function updateEmployee(req,res,next){
    let {body} = req
    let {id} = req.params

    //handle absence of a body
    if(!Object.keys(body).length){
        res.status(HTTPSTATUS.UNPROCESSABLE_ENTITY).send({message:"Please add employee details"})
    }
    else{
        let result = await employeeHandler.handleUpdateEmployee(id, body)

        if(result.error){
            next(result.error)
        }
        else{
            res.json({success:"Updated successfully"})

        }
    }
}

//function to get a specific employee
async function getEmployee(req,res,next){
    let {id}= req.params

    let result = await employeeHandler.handleGetEmployee(id)
    if(result.error){
        next(result.error)
    }else{
        res.status(HTTPSTATUS.OK).json({success:"Data Fetched Successfully ", data: result})
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
        res.status(HTTPSTATUS.OK).json({success:"Employee deleted Successfully"})
    }

}

//this function returns all employees of a given department
async function getDepartmentEmployees(req,res,next){
    let {id} = req.params

    //some default values for the page and limit values in case the user does not provide
    const {page = 1} = req.query
    //check to see if limit values are within a certain bound

        let limit = 20

        let data = await employeeHandler.handleGetDepartmentEmployees(id, page, limit)

        if(data.error){
            next(data.error)
        }
        //if department is valid and array is empty, that means no employees exist in that department
        else if(!data.results.length){
            res.status(HTTPSTATUS.OK).json({message:"No Data Found for this page"})
        }
        else{
            res.status(HTTPSTATUS.OK).json({success:"Records Fetched ", data:data})
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