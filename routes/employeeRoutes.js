const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers/employeeController')

//get all employees

employeeRouter.get('/allEmployees',employeeController.getAllEmployees)

//add a new employee
employeeRouter.post('/addEmployee',employeeController.addEmployee)

//edit specific employee with their id
employeeRouter.put('/editEmployee/:id',employeeController.updateEmployee)

//get specific employee with their id
employeeRouter.get('/getEmployee/:id',employeeController.getEmployee)

//delete an employee with their id
employeeRouter.delete('/deleteEmployee/:id',employeeController.deleteEmployee)

//get employees for a specific department, implements indexing for faster query
employeeRouter.get('/getDeptEmployees/:dept',employeeController.getDepartmentEmployees)

module.exports = {employeeRouter: employeeRouter}