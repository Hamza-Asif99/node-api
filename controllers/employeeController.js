const Employee = require("../models/employeeSchema");

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
        let doc = await Employee.insertMany(data)
        res.json({success:"Doc added "+doc})
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

        //if no doc returned that means that no employee exists with that id
        if(!doc){
            res.status(400).send({error:"Employee could not be found"})
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
    let searchedID= req.params.id
    console.log(searchedID)

    try{
        //using Model.findOne to find employee with given id
        let data = await Employee.findOne({empID: searchedID})
        //if data is null, that means the employee could not be found
        if(!data){
            res.status(400).send({error:"Employee could not be found"})
        }
        else{
            res.status(200).json({success:"Data Fetched Successfully "+data})
        }
    }catch(err){
        next(err)
    }
}

//function to delete a specific employee
async function deleteEmployee(req,res,next){
    let toDelete = req.params.id

    try{
        //using Model.deleteOne with the given ID
        let data = await Employee.deleteOne({empID:toDelete})

        //the deleteOne method gives back a object with deletedCount attribute
        // if it is equal to 0, that means the document was not found
        // and hence could not be deleted
        if(!data.deletedCount){
            res.status(400).send("Employee Not Found")
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
    let dept = req.params.dept

    try{
        //using Model.find with the given filter to only fetch employees of that department
        let data = await Employee.find({empDept:dept})
        //if empty array returned, that means either no records exist in the department
        // or the department itself doesn't exist
        if(!data.length){
            res.status(400).json({error:"No employees found for this department"})
        }
        else{
            res.status(200).json({success:"Records Fetched "+data})
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