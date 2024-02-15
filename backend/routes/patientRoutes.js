const patientController = require('../controllers/patientController')
const patientRoutes = require('express').Router()
const passport = require('passport')

    patientRoutes.get('/getAllPatient',passport.authenticate('jwt', { session: false }),patientController.getAllPatient)
    patientRoutes.get('/searchPatient/:branchId',passport.authenticate('jwt', { session: false }),patientController.searchPatient)
    patientRoutes.post('/addPatient',passport.authenticate('jwt', { session: false }),patientController.addPatient)
    patientRoutes.post('/addPatient/initial/:patientId',passport.authenticate('jwt', { session: false }),patientController.addPatientInitial)
    patientRoutes.post("/addPatient/healthEvaluation/:patientId",passport.authenticate('jwt', { session: false }),patientController.addPatientHealthEvaluation)
    patientRoutes.post("/addPatient/illnessHistory/:patientId",passport.authenticate('jwt', { session: false }),patientController.addPatientIllnessHistory)
    patientRoutes.put('/editPatient/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatient)
    patientRoutes.put('/editPatient/initial/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatientInitial)
    patientRoutes.put('/editPatient/healthEvaluation/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatientHealthEvaluation)
    patientRoutes.put('/editPatient/illnessHistory/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatientIllness)
    patientRoutes.delete('/:patientId',passport.authenticate('jwt',{session:false}),patientController.delPatient)
    
    module.exports = patientRoutes

    