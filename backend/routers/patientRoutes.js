const patientController = require('../controllers/patientController')
const patientRoutes = require('express').Router()
const passport = require('passport')

try {
   patientRoutes.post("/addpatient",patientController.addPatient)

   module.exports = patientRoutes
} catch (error) {
    console.log(error)
}