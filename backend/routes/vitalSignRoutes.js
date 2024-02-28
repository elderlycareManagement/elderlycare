const vitalSignController = require('../controllers/vitalSignController')
const vitalSignRoutes = require('express').Router()
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: VitalSign Controller
 *   description: VitalSign Management API
 * /api/vitalSign/getVitalSign/{patientId}:
 *   get:
 *     summary: GetAllVitalsign
 *     tags: [VitalSign Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
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
vitalSignRoutes.get('/getVitalSign/:patientId',passport.authenticate('jwt',{session:false}),vitalSignController.getVitalSign)

/**
 * @swagger
 * /api/vitalSign/addVitalSign/{patientId}:
 *   post:
 *     summary: Add VitalSign
 *     tags: [VitalSign Controller]
 *     parameters:
 *       - in: path
 *         name: patientId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddVitalSign'
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
vitalSignRoutes.post('/addVitalSign/:patientId',passport.authenticate('jwt',{session:false}),vitalSignController.addVitalSign)

/**
 * @swagger
 * /api/vitalSign/editVitalSign/{vitalSignId}:
 *   post:
 *     summary: Edit VitalSign
 *     tags: [VitalSign Controller]
 *     parameters:
 *       - in: parameter
 *         name: vitalSignId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddVitalSign'
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
vitalSignRoutes.put('/editVitalSign/:vitalSignId',passport.authenticate('jwt',{session:false}),vitalSignController.editVitalSign)

/**
 * @swagger
 * /api/vitalSign/{branchId}:
 *   delete:
 *     summary: Delete VitalSign
 *     tags: [VitalSign Controller]
 *     parameters:
 *       - in: parameter
 *         name: VitalSignId
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
vitalSignRoutes.delete('/:vitalSignId',passport.authenticate('jwt',{session:false}),vitalSignController.delVital)

module.exports = vitalSignRoutes

/**
 * @swagger
 * components:
 *   schemas:
 *     AddVitalSign:
 *       type: object
 *       properties:
 *         dateTime:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: integer
 *         BP_SYS:
 *           type: integer
 *         BP_DIA:
 *           type: integer
 *         pulse:
 *           type: integer
 *         weight:
 *           type: number
 *         height:
 *           type: number
 *         o2:
 *           type: number
 *         glucose:
 *           type: number
 *       required:
 *         - dateTime
 *         - createdBy
 *         - BP_SYS
 *         - BP_DIA
 *         - pulse
 *         - weight
 *         - height
 *         - o2
 *         - glucose
 */
