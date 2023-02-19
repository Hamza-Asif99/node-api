const express = require('express')
const employeeRouter = express.Router()

const Employee = require('../models/employeeSchema')
const {Error} = require("mongoose");

employeeRouter.get('/allEmployees',function (req,res,next){
    Employee.find(function(err,data){
        if(err){
            next(err)
        }else{
            res.json(data)
        }
    })
})

employeeRouter.post('/enterEmployee',function(req,res,next){
    let data = req.body
    Employee.insertMany(data,function(err,docs){
        if(err){
            next(err)
        }else{
            res.json({success:docs})
        }
    })
})

employeeRouter.put('/editEmployee/:name',async function (req,res,next){
    let data = req.body

    Employee.findOneAndUpdate({empName: req.params.name},data,{new:true},function(err,doc){
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

employeeRouter.get('/getEmployee/:name',function(req,res,next){
    let searchedName= req.params.name
    console.log(searchedName)

    Employee.findOne({empName: searchedName},function(err,data){
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

employeeRouter.delete('/deleteEmployee/:name',function(req,res,next){
    let toDelete = req.params.name

    Employee.deleteOne({empName:toDelete},function(err,data){
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

module.exports = {employeeRouter: employeeRouter}