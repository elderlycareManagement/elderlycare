const treatmentRecordController = require('../controllers/treatmentRecordController')
const treatmentRoutes = require('express').Router()
const passport = require('passport')


    treatmentRoutes.get('/getAllTreatment',passport.authenticate('jwt',{session:false}),treatmentRecordController.getAllTreatment)
    treatmentRoutes.get('/searchTreatment/:branchId',passport.authenticate('jwt',{session:false}),treatmentRecordController.searchTreatment)
    treatmentRoutes.post("/addtreatment",passport.authenticate('jwt',{session:false}),treatmentRecordController.addTreatment)
    treatmentRoutes.put('/editTreeatment/:treatmentId',passport.authenticate('jwt',{session:false}),treatmentRecordController.editTreeatment)
    // treatmentRoutes.delete('treatment/:id',passport.authenticate('jwt',{session:false}),treatmentRecordController)
 
    module.exports = treatmentRoutes
