const appointmentController = require('../controllers/appointmentRecordController')
const appointmentRoute = require('express').Router()
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: Appointment Controller
 *   description: Appointment Management API
 * /api/appoint/getAllAppoint:
 *   get:
 *     summary: GetAllAppointment
 *     tags: [Appointment Controller]
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
    appointmentRoute.get('/getAllAppoint',passport.authenticate('jwt',{session:false}),appointmentController.getAllAppoint)
    
/**
 * @swagger
 * /api/appoint/searchAppoint/{branchId}:
 *   get:
 *     summary: Search Appointment By BranchId
 *     tags: [Appointment Controller]
 *     parameters:
 *       - in: parameter
 *         name: branchId
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: doctorId
 *         schema:
 *           type: integer
 *         required: false
 *     responses:
 *       200:
 *         description: พบข้อมูล.
 *       400:
 *         description: ไม่พบข้อมูล
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    appointmentRoute.get('/searchAppoint/:branchId',passport.authenticate('jwt',{session:false}),appointmentController.searchAppoint)

/**
 * @swagger
 * /api/appoint/searchAppointDate:
 *   get:
 *     summary: Search Appointment By BranchId
 *     tags: [Appointment Controller]
 *     parameters:
 *       - in: query
 *         name: appointmentId
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *       - in: query
 *         name: appointDate
 *         schema:
 *           type: integer
 *         required: false
 *     responses:
 *       200:
 *         description: พบข้อมูล.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    appointmentRoute.get('/searchAppointDate',passport.authenticate('jwt',{session:false}),appointmentController.searchAppointDate)

/**
 * @swagger
 * /api/appoint/addAppoint:
 *   post:
 *     summary: Add Appointment
 *     tags: [Appoint Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAppoint'
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลเสร็จสิ้น.
 *       400:
 *         description: มีข้อมูลการนัดอยู่แล้ว. 
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    appointmentRoute.post('/addAppoint',passport.authenticate('jwt',{session:false}),appointmentController.addAppointment)

/**
 * @swagger
 * /api/appoint/addAppointDate/{appointId}:
 *   post:
 *     summary: Add AppointmentDate
 *     tags: [Appointment Controller]
 *     parameters:
 *       - in: query
 *         name: appointId
 *         schema:
 *           type: integer
 *         required: false
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAppointDate'
 *     responses:
 *       200:
 *         description: เพิ่มข้อมูลเสร็จสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
    appointmentRoute.post('/addAppointDate/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.addAppointmentDate)

/**
 * @swagger
 * /api/appoint/editAppoint/{appointId}:
 *   put:
 *     summary: Edit Appoint
 *     tags: [Appointment Controller]
 *     parameters:
 *       - in: parameter
 *         name: appointId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditAppoint'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลเสร็จสิ้น.
 *       400:
 *         description: ไม่พบข้อมูลการนัดหมาย
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 *       500:
 *         description: Some server error
 *
 */
    appointmentRoute.put('/editAppoint/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.editAppoint)

/**
 * @swagger
 * /api/appoint/editAppointDate/{appointId}:
 *   put:
 *     summary: Edit AppointDate
 *     tags: [Appointment Controller]
 *     parameters:
 *       - in: parameter
 *         name: appointId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditAppointDate'
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
    appointmentRoute.put('/editAppointDate/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.editAppointDate)
/**
 * @swagger
 * /api/appoint/{appointId}:
 *   delete:
 *     summary: Delete appoint
 *     tags: [Appointment Controller]
 *     parameters:
 *       - in: parameter
 *         name: appointId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: ลบข้อมูลสำเร็จ.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 */
    appointmentRoute.delete('/:appointId',passport.authenticate('jwt',{session:false}),appointmentController.delAppoint)

module.exports = appointmentRoute

/**
 * @swagger
 * components:
 *   schemas:
 *     AddAppoint:
 *       type: object
 *       properties:
 *         patientId:
 *           type: integer
 *         description:
 *           type: string
 *         doctorId:
 *           type: integer
 *         branchId:
 *           type: integer
 *         createId:
 *           type: integer
 *       required:
 *         - patientId
 *         - description
 *         - doctorId
 *         - branchId
 *         - createId
 *     AddAppointDate:
 *        type: object
 *        properties:
 *            appointDate:
 *               type: string
 *               format: date-time
 *        required:
 *          - appointDate
 *     EditAppoint:
 *       type: object
 *       properties:
 *         description:
 *           type: string
 *         doctorId:
 *           type: integer
 *         branchId:
 *           type: integer
 *         createId:
 *           type: integer
 *       required:
 *         - patientId
 *         - description
 *         - doctorId
 *         - branchId
 *         - createId
 *     EditAppointDate:
 *       type: object
 *       properties:
 *         appointDate:
 *           type: string
 *           format: date
 *       required:
 *         - appointDate
 *          
 */
