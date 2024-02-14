const appointmentController = require('../controllers/appointmentRecordController')
const appointmentRoute = require('express').Router()
const passport = require('passport')

    appointmentRoute.get('/getAllAppoint',passport.authenticate('jwt',{session:false}),appointmentController.getAllAppoint)
    appointmentRoute.get('/searchAppoint/:branch',passport.authenticate('jwt',{session:false}),appointmentController.searchAppointDate)
    appointmentRoute.post('/addAppoint',passport.authenticate('jwt',{session:false}),appointmentController.addAppointment)
    appointmentRoute.post('/addAppointDate/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.addAppointmentDate)
    appointmentRoute.put('/editAppoint/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.editAppoint)
    appointmentRoute.put('/editAppointDate/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.editAppointDate)
    appointmentRoute.delete('/appoint/:id',passport.authenticate('jwt',{session:false}),appointmentController)

module.exports = appointmentRoute