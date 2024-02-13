const treatmentRecordController = require('../controllers/treatmentRecordController')
const treatmentRoutes = require('express').Router()
const passport = require('passport')


    // treatmentRoutes.get('/getAllTreatment',passport.authenticate('jwt',{session:false}),treatmentRecordController)
    // treatmentRoutes.get('getAllTreatment/:branch',passport.authenticate('jwt',{session:false}),treatmentRecordController)
    // treatmentRoutes.get('getTreatment/:id',passport.authenticate('jwt',{session:false}),treatmentRecordController)
    // treatmentRoutes.get('searchEmployee/:branch',passport.authenticate('jwt',{session:false}),treatmentRecordController)
    treatmentRoutes.post("/addtreatment",passport.authenticate('jwt',{session:false}),treatmentRecordController.addTreatment)
    // treatmentRoutes.put('/editTreeatment/:id',passport.authenticate('jwt',{session:false}),treatmentRecordController)
    // treatmentRoutes.delete('treatment/:id',passport.authenticate('jwt',{session:false}),treatmentRecordController)
 
    module.exports = treatmentRoutes
