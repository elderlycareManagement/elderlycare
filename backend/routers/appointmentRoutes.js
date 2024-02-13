const appointmentController = require('../controllers/appointmentController')
const appointmentRoute = require('express').Router()
const passport = require('passport')

    appointmentRoute.get('/getAllAppoint',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.get('/getAllAppoint/:branch',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.get('/getAppoint/:id',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.get('/searchAppoint/:branch',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.post('/addAppoint',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.post('/addAppointDate',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.put('/editAppointDate',passport.authenticate('jwt',{session:false}),appointmentController)
    appointmentRoute.delete('/appoint/:id',passport.authenticate('jwt',{session:false}),appointmentController)

module.exports = appointmentRoute