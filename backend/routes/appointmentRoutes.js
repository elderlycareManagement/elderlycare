const appointmentController = require('../controllers/appointmentRecordController')
const appointmentRoute = require('express').Router()
const passport = require('passport')

    appointmentRoute.get('/getAllAppoint',passport.authenticate('jwt',{session:false}),appointmentController.getAllAppoint)
    appointmentRoute.get('/searchAppoint/:branchId',passport.authenticate('jwt',{session:false}),appointmentController.searchAppoint)
    appointmentRoute.post('/addAppoint',passport.authenticate('jwt',{session:false}),appointmentController.addAppointment)
    appointmentRoute.post('/addAppointDate/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.addAppointmentDate)
    appointmentRoute.put('/editAppoint/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.editAppoint)
    appointmentRoute.put('/editAppointDate/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.editAppointDate)
    appointmentRoute.delete('/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.delAppoint)

module.exports = appointmentRoute