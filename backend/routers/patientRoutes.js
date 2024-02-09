const patientController = require('../controllers/patientController')
const patientRoutes = require('express').Router()
const passport = require('passport')


    patientRoutes.post("/addpatient",passport.authenticate('jwt', { session: false }),patientController.addPatient)
    patientRoutes.get('/findPatient',passport.authenticate('jwt', { session: false }),patientController.reqDataPateint)
    patientRoutes.get('/findAllPatient',passport.authenticate('jwt', { session: false }),patientController.dataPatient)
    
    module.exports = patientRoutes