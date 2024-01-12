const employeeController = require('../controllers/employeeController')
const employeeRoute = require('express').Router()
const passport = require('passport')


   employeeRoute.get('/getall',employeeController.GetAllEmployee)
   employeeRoute.post('/add',employeeController.AddEmployee)
   employeeRoute.post('/login',employeeController.Login)
   employeeRoute.patch('/editemployee',employeeController.EditEmployee)
   employeeRoute.patch('/editpassword',employeeController.EditPassword)
   employeeRoute.delete('/delemployee/:id',employeeController.DeleteEmployee)

   module.exports = employeeRoute
