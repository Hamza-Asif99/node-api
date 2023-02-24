const express = require('express')
const {employeeHandler} = require("../handlers");
const employeeRouter = express.Router()
const employeeController = require('../controllers').employeeController
const {tokenManagement} = require('../utils')

//employee auth routes
employeeRouter.get('/login',tokenManagement.verifyToken,function(req,res,next){
    /* 	#swagger.tags = ['Employee']
           #swagger.description = 'Endpoint to login' */

    /* #swagger.security = [{
               "api_key": []
      }] */
    employeeController.login(req,res,next)
})

employeeRouter.get('/logout',tokenManagement.verifyToken,function(req,res,next){
    /* 	#swagger.tags = ['Employee']
           #swagger.description = 'Endpoint to logout' */

    employeeController.logout(req,res,next)
})

//get all employees
employeeRouter.get('/',tokenManagement.verifyToken ,function(req,res,next){
    /* 	#swagger.tags = ['Employee']
            #swagger.description = 'Endpoint to get paginated list of all employees' */

    /* #swagger.parameters['page'] = {
               in: 'query',
               description: 'Get employees on a specific page',

        } */
    employeeController.getAllEmployees(req,res,next)
})

//add a new employee
employeeRouter.post('/', tokenManagement.verifyToken ,function(req,res,next){

    /* 	#swagger.tags = ['Employee']
            #swagger.description = 'Endpoint to add an employee' */

    /* #swagger.parameters['newEmployee'] = {
               in: 'body',
               required:true,
               description: 'Add Employee',

               schema: { $ref: "#/definitions/AddEmployee" }

        } */

    employeeController.addEmployee(req,res,next)
})

//edit specific employee with their id
employeeRouter.put('/:id',tokenManagement.verifyToken,function (req,res,next){
    /* 	#swagger.tags = ['Employee']
           #swagger.description = 'Edit a specific employee' */

    /* #swagger.parameters['editEmployee'] = {
               in: 'body',
               required:true,
               description: 'Add Employee',

               schema: { $ref: "#/definitions/AddEmployee" }

        } */

    employeeController.updateEmployee(req,res,next)
})

//get specific employee with their id
employeeRouter.get('/:id',tokenManagement.verifyToken,function(req,res,next){
    /* 	#swagger.tags = ['Employee']
           #swagger.description = 'Endpoint to get a specific employee' */

    employeeController.getEmployee(req,res,next)
})

//delete an employee with their id
employeeRouter.delete('/:id',tokenManagement.verifyToken,function(req,res,next){

    /* 	#swagger.tags = ['Employee']
           #swagger.description = 'Endpoint to delete a specific employee' */

    employeeController.deleteEmployee(req,res,next)
})

//get employees for a specific department, implements indexing for faster query
employeeRouter.get('/department/:id',tokenManagement.verifyToken,function(req,res,next){
    /* 	#swagger.tags = ['Employee']
           #swagger.description = 'Endpoint to get paginated list of employees of a specific department' */

    /* #swagger.parameters['page'] = {
               in: 'query',
               description: 'Get employees on a specific page',
        } */
    employeeController.getDepartmentEmployees(req,res,next)
})

module.exports = employeeRouter