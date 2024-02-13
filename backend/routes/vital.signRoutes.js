const vitalSignController = require('../controllers/vital.signController')
const vitalSignRoute = require('express').Router()
const passport = require('passport')

    // vitalSignRoute.get('/getAllVitalSign',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.get('/getAllVitalSign/:branchId',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.get('/getVitalSign/:id',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.get('/getVitalSign/role/:role',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.get('/searchVitalSign/:branchId',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.post('/addVitialSign',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.put('/editVitialSign',passport.authenticate('jwt',{session:false}),vitalSignController)
    // vitalSignRoute.delete('/vitialSign/:id',passport.authenticate('jwt',{session:false}),vitalSignController)

module.exports = appointmentRoute