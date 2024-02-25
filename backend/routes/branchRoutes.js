const branchController = require('../controllers/branchController')
const branchRoutes = require('express').Router()
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: Branch Controller
 *   description: Branch Management API
 * /api/branch/getAllBranch:
 *   get:
 *     summary: GetAllBranch
 *     tags: [Branch Controller]
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
    branchRoutes.get('/getAllBranch',passport.authenticate('jwt',{session:false}),branchController.getAllBranch)
/**
 * @swagger
 * /api/branch/getBranch/{branchId}:
 *   get:
 *     summary: Get Branch By Id
 *     tags: [Branch Controller]
 *     parameters:
 *       - in: parameter
 *         name: branchId
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
    branchRoutes.get('/getBranch/:branchId',passport.authenticate('jwt',{session:false}),branchController.getBranch)

/**
 * @swagger
 * /api/branch/addBranch:
 *   post:
 *     summary: Add Branch
 *     tags: [Branch Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddBranch'
 *     responses:
 *       200:
 *         description: เพิ่มสาขาสำเร็จ.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 */
    branchRoutes.post("/addBranch",passport.authenticate('jwt',{session:false}),branchController.addBranch)

/**
 * @swagger
 * /api/branch/editBranch/{branchId}:
 *   post:
 *     summary: Edit Branch
 *     tags: [Branch Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddBranch'
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลสำเร็จ.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 */
    branchRoutes.put('/editBranch/:branchId',passport.authenticate('jwt',{session:false}),branchController.editBranch)

/**
 * @swagger
 * /api/branch/{branchId}:
 *   delete:
 *     summary: Delete Branch
 *     tags: [Branch Controller]
 *     parameters:
 *       - in: parameter
 *         name: branchId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลสำเร็จ.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API
 * 
 *       500:
 *         description: เกิดข้อผิดพลาด
 */
    branchRoutes.delete(':branchId',passport.authenticate('jwt',{session:false}),branchController.delBranch)

module.exports = branchRoutes

/**
 * @swagger
 * components:
 *   schemas:
 *     AddBranch:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         tel:
 *           type: string
 *         managerId:
 *           type: integer
 *       required:
 *         - name
 *         - address
 *         - tel
 *         - managerId
 */