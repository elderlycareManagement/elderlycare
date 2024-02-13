const patientController = require('../controllers/patientController')
const patientRoutes = require('express').Router()
const passport = require('passport')

    patientRoutes.get('/getAllPatient',passport.authenticate('jwt', { session: false }),patientController.dataPatient)
    patientRoutes.get('/getAllPatient/:branch',passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.get('/getPatient/:id',passport.authenticate('jwt', { session: false }),patientController.reqDataPateint)
    patientRoutes.get('/searchPatient/:branch',passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.post("/addPatient",passport.authenticate('jwt', { session: false }),patientController.addPatient)
    patientRoutes.post("/addPatient/initial/:id",passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.post("/addPatient/healthEvaluation/:id",passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.post("/addPatient/illnessHistory/:id",passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.put('/editPatient/:id',passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.put('/editPatient/initial/:id',passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.put('/editPatient/healthEvaluation/:id',passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.put('/editPatient/illnessHistory/:id',passport.authenticate('jwt', { session: false }),patientController)
    patientRoutes.delete('/patient/:id',passport.authenticate('jwt',{session:false}),patientController)
    
    module.exports = patientRoutes