const Employee = require("../models/employeeSchema");

async function getAllEmployees (req,res,next){
    try{
        let data = await Employee.find({})
        res.json(data)
    }catch(err){
        next(err)
    }
}

async function addEmployee (req,res,next){
    let data = req.body
    try{
        let doc = await Employee.insertMany(data)
        res.json({success:"Doc added "+doc})
    }catch(err){
        next(err)
    }
}

async function updateEmployee(req,res,next){
    let data = req.body

    try{
        //find employee matching the params id and update it
        // the {new:true} parameter is used to return the updated doc instead of the original one
        let doc = await Employee.findOneAndUpdate({empID:req.params.id}, data , {new:true})
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

async function getEmployee(req,res,next){
    let searchedID= req.params.id
    console.log(searchedID)

    try{
        let data = await Employee.findOne({empID: searchedID})
        console.log(data)
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

async function deleteEmployee(req,res,next){
    let toDelete = req.params.id

    try{
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

async function getDepartmentEmployees(req,res,next){
    let dept = req.params.dept
    console.log(dept)

    try{
        let data = await Employee.find({empDept:dept})
        console.log(data)
        if(!data.length){
            res.status(400).json({error:"Dept number invalid"})
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