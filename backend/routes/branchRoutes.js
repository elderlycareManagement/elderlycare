const branchController = require('../controllers/branchController')
const branchRoutes = require('express').Router()
const passport = require('passport')

    branchRoutes.get('/getAllBranch',passport.authenticate('jwt',{session:false}),branchController.getAllBranch)
    branchRoutes.get('/getBranch/:branchId',passport.authenticate('jwt',{session:false}),branchController.getBranch)
    branchRoutes.post("/addBranch",passport.authenticate('jwt',{session:false}),branchController.addBranch)
    branchRoutes.put('/editBranch/:branchId',passport.authenticate('jwt',{session:false}),branchController.editBranch)
    branchRoutes.delete('/delBranch/:branchId',passport.authenticate('jwt',{session:false}),branchController.delBranch)

module.exports = branchRoutes