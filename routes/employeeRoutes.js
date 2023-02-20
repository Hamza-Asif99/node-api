const express = require('express')
const employeeRouter = express.Router()

const Employee = require('../models/employeeSchema')
const {Error} = require("mongoose");


//get all employees
employeeRouter.get('/allEmployees',function (req,res,next){
    Employee.find(function(err,data){
        if(err){
            next(err)
        }else{
            res.json(data)
        }
    })
})
//add a new employee
employeeRouter.post('/addEmployee',function(req,res,next){
    let data = req.body
    Employee.insertMany(data,function(err,docs){
        if(err){
            next(err)
        }else{
            res.json({success:docs})
        }
    })
})
//edit specific employee with their id
employeeRouter.put('/editEmployee/:id',async function (req,res,next){
    let data = req.body

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

})
//get specific employee with their id
employeeRouter.get('/getEmployee/:id',function(req,res,next){
    let searchedID= req.params.id
    console.log(searchedID)

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
})

//delete an employee with their id
employeeRouter.delete('/deleteEmployee/:id',function(req,res,next){
    let toDelete = req.params.id

    Employee.deleteOne({empID:toDelete},function(err,data){
        if(err){
            next(err)
        }
        else if(data.deletedCount == 0) {
            res.status(404).send("Employee not found")
        }else{
            res.json(data)
        }
    })
})

//get employees for a specific department, implements indexing for faster query
employeeRouter.get('/getDeptEmployees/:dept',function(req,res,next){
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
    }).explain("executionStats")
})

module.exports = {employeeRouter: employeeRouter}