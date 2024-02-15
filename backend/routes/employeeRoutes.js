const employeeController = require('../controllers/employeeController')
const employeeRoute = require('express').Router()
const passport = require('passport')

   employeeRoute.get('/getAllEmployee',passport.authenticate('jwt', { session: false }),employeeController.getAllEmployee)
   employeeRoute.get('/searchEmployee/:branchId',passport.authenticate('jwt', { session: false }),employeeController.searchEmployeeBybranchActive)
   employeeRoute.post('/addEmployee',passport.authenticate('jwt', { session: false }),employeeController.AddEmployee)
   employeeRoute.post('/login',employeeController.Login)
   employeeRoute.put('/editEmployee/:id',passport.authenticate('jwt', { session: false }),employeeController.EditEmployee)
   employeeRoute.patch('/editPassword/:id',passport.authenticate('jwt', { session: false }),employeeController.EditPassword)
   employeeRoute.delete('/:id',passport.authenticate('jwt', { session: false }),employeeController.DeleteEmployee)

   module.exports = employeeRoute
