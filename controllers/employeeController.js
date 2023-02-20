const Employee = require("../models/employeeSchema");

function getAllEmployees (req,res,next){
    Employee.find(function(err,data){
        if(err){
            next(err)
        }else{
            res.json(data)
        }
    })
}

function addEmployee (req,res,next){
    let data = req.body
    Employee.insertMany(data,function(err,docs){
        if(err){
            next(err)
        }else{
            res.json({success:docs})
        }
    })
}

async function updateEmployee(req,res,next){
    let data = req.body

    //find employee matching the params id and update it
    // the {new:true} parameter is used to return the updated doc instead of the original one
    Employee.findOneAndUpdate({empID: req.params.id},data,{new:true},function(err,doc){
        if(err){
            next(err)
        }
        else if(doc == null) {
            res.status(404).send("Employee not found")
        }
        else{
            res.json({success:"Updated successfully"})
        }
    })

}

function getEmployee(req,res,next){
    let searchedID= req.params.id

    Employee.findOne({empID: searchedID},function(err,data){
        if(err){
            next(err)
        }
        else if(data == null) {
            res.status(404).send("Employee not found")
        }else{
            res.json(data)
        }
    })
}

function deleteEmployee(nreq,res,next){
    let toDelete = req.params.id

    Employee.deleteOne({empID:toDelete},function(err,data){
        if(err){
            next(err)
        }
            //the deleteOne method gives back a object with deletedCount attribute
            // if it is equal to 0, that means the document was not found
        // and hence could not be deleted
        else if(data.deletedCount == 0) {
            res.status(404).send("Employee not found")
        }else{
            res.json(data)
        }
    })
}

function getDepartmentEmployees(req,res,next){
    let dept = req.params.dept
    console.log(dept)
    Employee.find({empDept:dept},function(err,data){
        if(err){
            next(err)
        }
        else if(!data){
            res.status(404).json({error:"Department Number Invalid"})
        }
        else{
            res.json({success:" Records Fetched"+data})
        }
    })
}

module.exports = {
    getAllEmployees,
    addEmployee,
    updateEmployee,
    getEmployee,
    deleteEmployee,
    getDepartmentEmployees
}