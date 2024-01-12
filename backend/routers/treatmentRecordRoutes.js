const treatmentRecordController = require('../controllers/treatmentRecordController')
const patientRoutes = require('express').Router()
const passport = require('passport')

try {
    patientRoutes.post("/addtreatment",treatmentRecordController.add_treatment)
 
    module.exports = patientRoutes
 } catch (error) {
     console.log(error)
 }