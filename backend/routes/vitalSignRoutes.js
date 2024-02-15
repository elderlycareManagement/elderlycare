const { Model } = require('sequelize')
const vitalSignController = require('../controllers/vitalSignController')
const vitalSignRoutes = require('express').Router()
const passport = require('passport')

vitalSignRoutes.get('/getVitalSign/:patientId',passport.authenticate('jwt',{session:false}),vitalSignController.getVitalSign)
vitalSignRoutes.post('/addVitalSign/:patientId',passport.authenticate('jwt',{session:false}),vitalSignController.addVitalSign)
vitalSignRoutes.put('/editVitalSign/:vitalSignId',passport.authenticate('jwt',{session:false}),vitalSignController.editVitalSign)
vitalSignRoutes.delete('/:vitalSignId',passport.authenticate('jwt',{session:false}),vitalSignController.delVital)

module.exports = vitalSignRoutes