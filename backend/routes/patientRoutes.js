const patientController = require('../controllers/patientController')
const patientRoutes = require('express').Router()
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: Patient Controller
 *   description: Patient Management API
 * /api/patient/getAllPatient:
 *   get:
 *     summary: GetAllPatient
 *     tags: [Patient Controller]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.get('/getAllPatient',passport.authenticate('jwt', { session: false }),patientController.getAllPatient)

/**
 * @swagger
 * /api/patiet/searchPatient/{branchId}:
 *   get:
 *     summary: Search Patient By BranchId
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the branch to search for employees.
 *       - in: query
 *         name: peopleCode
 *         schema:
 *           type: String
 *         required: false
 *         description: The ID of the branch to search for employees.
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: String
 *         required: false
 *         description: The ID of the branch to search for employees.
 *     responses:
 *       200:
 *         description: ดึงข้อมูลสำเร็จ.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.get('/searchPatient/:branchId',passport.authenticate('jwt', { session: false }),patientController.searchPatient)

/**
 * @swagger
 * /api/patient/addPatient/{branchId}:
 *   post:
 *     summary: Add Patient
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddPatient'
 *     responses:
 *       200:
 *         description: The created book.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    patientRoutes.post('/addPatient/:branchId',passport.authenticate('jwt', { session: false }),patientController.addPatient)  ////

/**
 * @swagger
 * /api/patient/addPatient/initial/{patientId}:
 *   post:
 *     summary: Add Initial
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddInitial'
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    patientRoutes.post('/addPatient/initial/:patientId',passport.authenticate('jwt', { session: false }),patientController.addPatientInitial)

/**
 * @swagger
 * /api/patient/addPatient/healthEvaluation/{patientId}:
 *   post:
 *     summary: Add HealthEvaluation
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddHealthEva'
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    patientRoutes.post("/addPatient/healthEvaluation/:patientId",passport.authenticate('jwt', { session: false }),patientController.addPatientHealthEvaluation)

/**
 * @swagger
 * /api/patient/addPatient/illnessHistory/{patientId}:
 *   post:
 *     summary: Add HealthEvaluation
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddIllnessHistory'
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    patientRoutes.post("/addPatient/illnessHistory/:patientId",passport.authenticate('jwt', { session: false }),patientController.addPatientIllnessHistory)

/**
 * @swagger
 * /api/patient/editPatient/{patientId}:
 *   put:
 *     summary: Edit Patient
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddPatient'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.put('/editPatient/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatient)

/**
 * @swagger
 * /api/patient/editPatient/initial/{patientId}:
 *   put:
 *     summary: Edit Patient
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddInitial'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.put('/editPatient/initial/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatientInitial)

/**
 * @swagger
 * /api/patient/editPatient/healthEvaluation/{patientId}:
 *   put:
 *     summary: Edit Patient
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddHealthEva'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.put('/editPatient/healthEvaluation/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatientHealthEvaluation)

/**
 * @swagger
 * /api/patient/editPatient/illnessHistory/{patientId}:
 *   put:
 *     summary: Edit Patient
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddIllnessHistory'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.put('/editPatient/illnessHistory/:patientId',passport.authenticate('jwt', { session: false }),patientController.editPatientIllness)
/**
 * @swagger
 * /api/patient/{patientId}:
 *   delete:
 *     summary: Delete Patient
 *     tags: [Patient Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    patientRoutes.delete('/:patientId',passport.authenticate('jwt',{session:false}),patientController.delPatient)
    
    module.exports = patientRoutes

    /**
 * @swagger
 * components:
 *   schemas:
 *     AddPatient:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         peopleCode:
 *           type: string
 *         receivedDate:
 *           type: string
 *           format: date
 *         recentIllness:
 *           type: string
 *         lastReceived:
 *           type: string
 *           format: date
 *         consciousness:
 *           type: string
 *         patientHistory:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - peopleCode
 *         - receivedDate
 *         - recentIllness
 *         - lastReceived
 *         - consciousness
 *         - patientHistory
 *     AddInitial:
 *       type: object
 *       properties:
 *         receivedFrom:
 *           type: string
 *         received:
 *           type: string
 *           format: date
 *         infoProvider:
 *           type: string
 *         medicalDiagnosis:
 *           type: string
 *         currentIllness:
 *           type: string
 *         symptom:
 *           type: string
 *       required:
 *         - receivedFrom
 *         - received
 *         - infoProvider
 *         - medicalDiagnosis
 *         - currentIllness
 *         - symptom
 *     AddHealthEva:
 *       type: object
 *       properties:
 *         CDE:
 *           type: string
 *         CDV:
 *           type: string
 *         CDM:
 *           type: string
 *         skinColor:
 *           type: string
 *         head:
 *           type: string
 *         speaking:
 *           type: string
 *         vision:
 *           type: string
 *         hearing:
 *           type: string
 *         oral:
 *           type: string
 *         breathing:
 *           type: string
 *         bloodCirculation:
 *           type: string
 *         stomach:
 *           type: string
 *         fertility:
 *           type: string
 *         abnormalities:
 *           type: string
 *         behavior:
 *           type: string
 *         mood:
 *           type: string
 *         anxious:
 *           type: string
 *         moveMent:
 *           type: string
 *         FRA:
 *           type: string
 *         sleep:
 *           type: string
 *         eat:
 *           type: string
 *         problemEat:
 *           type: string
 *         excretion:
 *           type: string
 *         addictivething:
 *           type: string
 *         problemPatient:
 *           type: string
 *       required:
 *         - CDE
 *         - CDV
 *         - CDM
 *         - skinColor
 *         - head
 *         - speaking
 *         - vision
 *         - hearing
 *         - oral
 *         - breathing
 *         - bloodCirculation
 *         - stomach
 *         - fertility
 *         - abnormalities
 *         - behavior
 *         - mood
 *         - anxious
 *         - moveMent
 *         - FRA
 *         - sleep
 *         - eat
 *         - problemEat
 *         - excretion
 *         - addictivething
 *         - problemPatient
 *     AddIllnessHistory:
 *       type: object
 *       properties:
 *         congenitalDisease:
 *           type: string
 *         lastHospitalTreatment:
 *           type: string
 *         surgeryHistory:
 *           type: string
 *         illnessFamilyHistory:
 *           type: string
 *         allergies:
 *           type: string
 *       required:
 *         - congenitalDisease
 *         - lastHospitalTreatment
 *         - surgeryHistory
 *         - illnessFamilyHistory
 *         - allergies
 */

    