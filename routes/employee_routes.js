const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers').employeeController

//get all employees
employeeRouter.get('/',employeeController.getAllEmployees)

//add a new employee
employeeRouter.post('/',employeeController.addEmployee)

//edit specific employee with their id
employeeRouter.put('/:id',employeeController.updateEmployee)

//get specific employee with their id
employeeRouter.get('/:id',employeeController.getEmployee)

//delete an employee with their id
employeeRouter.delete('/:id',employeeController.deleteEmployee)

//get employees for a specific department, implements indexing for faster query
employeeRouter.get('/department/:id',employeeController.getDepartmentEmployees)

module.exports = {employeeRouter: employeeRouter}