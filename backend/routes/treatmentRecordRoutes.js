const treatmentRecordController = require('../controllers/treatmentRecordController')
const treatmentRoutes = require('express').Router()
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: Treatment Controller
 *   description: Treatment Management API
 * /api/treatment/getAllTreatment:
 *   get:
 *     summary: GetAllTreatment
 *     tags: [Treatment Controller]
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
    treatmentRoutes.get('/getAllTreatment',passport.authenticate('jwt',{session:false}),treatmentRecordController.getAllTreatment)

/**
 * @swagger
 * /api/treatment/searchTreatment/{branchId}:
 *   get:
 *     summary: Search Treatment By BranchId
 *     tags: [Treatment Controller]
 *     parameters:
 *       - in: parameter
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
 *         name: treatedDate
 *         schema:
 *           type: String
 *         required: false
 *         description: The ID of the branch to search for employees.
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the branch to search for employees.
 *       - in: query
 *         name: patientId
 *         schema:
 *           type: integer
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
    treatmentRoutes.get('/searchTreatment/:branchId',passport.authenticate('jwt',{session:false}),treatmentRecordController.searchTreatment)
/**
 * @swagger
 * /api/treatment/addTreatment:
 *   post:
 *     summary: Add Treatment
 *     tags: [Treatment Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddTreatment'
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    treatmentRoutes.post("/addTreatment",passport.authenticate('jwt',{session:false}),treatmentRecordController.addTreatment)

/**
 * @swagger
 * /api/treatment/editTreatment/{treatmentId}:
 *   put:
 *     summary: Edit Treatment
 *     tags: [Treatment Controller]
 *     parameters:
 *       - in: path
 *         name: treatmentId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditTreatment'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    treatmentRoutes.put('/editTreatment/:treatmentId',passport.authenticate('jwt',{session:false}),treatmentRecordController.editTreeatment)
    treatmentRoutes.delete('treatment/:id',passport.authenticate('jwt',{session:false}),treatmentRecordController.endTreatment)

   /**
 * @swagger
 * /api/treatment/tranfer/{treatmentId}/{branchId}:
 *   patch:
 *     summary: Edit Treatment
 *     tags: [Treatment Controller]
 *     parameters:
 *       - in: path
 *         name: treatmentId
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: branchId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: Some server error
 *
 */
    treatmentRoutes.patch('/tranfer/:treatmentId/:branchId',passport.authenticate('jwt',{session:false}),treatmentRecordController.tranferPatient)
    module.exports = treatmentRoutes

    /**
 * @swagger
 * components:
 *   schemas:
 *     AddTreatment:
 *       type: object
 *       properties:
 *         patientId:
 *           type: integer
 *         treatedDate:
 *           type: string
 *           format: date
 *         description:
 *           type: string
 *         doctorId:
 *           type: integer
 *         treatedAt:
 *           type: string
 *         createdBy:
 *           type: integer
 *       required:
 *         - patientId
 *         - treatedDate
 *         - description
 *         - doctorId
 *         - treatedAt
 *         - createdBy
 *     EditTreatment:
 *       type: object
 *       properties:
 *         treatedDate:
 *           type: string
 *           format: date
 *         description:
 *           type: string
 *         doctorId:
 *           type: integer
 *         treatedAt:
 *           type: string
 *         createdBy:
 *           type: integer
 *       required:
 *         - treatedDate
 *         - description
 *         - doctorId
 *         - treatedAt
 *         - createdBy
 */