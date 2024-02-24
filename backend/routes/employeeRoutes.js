const employeeController = require('../controllers/employeeController')
const employeeRoute = require('express').Router()
const passport = require('passport')

/**
 * @swagger
 * tags:
 *   name: Employee Controller
 *   description: Employee Management API
 * /api/employee/getAllEmployee:
 *   get:
 *     summary: GetAllEmployee
 *     tags: [Employee Controller]
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
employeeRoute.get('/getAllEmployee', passport.authenticate('jwt', { session: false }), employeeController.getAllEmployee)

/**
 * @swagger
 * /api/employee/searchEmployee/{branchId}:
 *   get:
 *     summary: Search Employee By BranchId
 *     tags: [Employee Controller]
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
 *         name: role
 *         schema:
 *           type: String
 *         required: false
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: String
 *         required: false
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
employeeRoute.get('/searchEmployee/:branchId', passport.authenticate('jwt', { session: false }), employeeController.searchEmployeeBybranchActive)

/**
 * @swagger
 * /api/employee/addEmployee:
 *   post:
 *     summary: Add Employee
 *     tags: [Employee Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddEmployee'
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
employeeRoute.post('/addEmployee', passport.authenticate('jwt', { session: false }), employeeController.AddEmployee)

/**
 * @swagger
 * /api/employee/login:
 *   post:
 *     summary: Login Employee
 *     tags: [Employee Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: ล็อคอินสำเสร็จ.
 *       401:
 *         description: Email หรือ Password ไม่ถูกต้อง.
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
employeeRoute.post('/login', employeeController.Login)

/**
 * @swagger
 * /api/employee/editEmployee/{id}:
 *   put:
 *     summary: Edit Employee
 *     tags: [Employee Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditEmployee'
 *     parameters:
 *       - in: parameter
 *         name: EmployeeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     responses:
 *       200:
 *         description: แก้ไขข้อมูลพนักงานเสร็ตสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API .
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
employeeRoute.put('/editEmployee/:id', passport.authenticate('jwt', { session: false }), employeeController.EditEmployee)

/**
 * @swagger
 * /api/employee/editPassword/{id}:
 *   patch:
 *     summary: Edit Password
 *     tags: [Employee Controller]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditPassword'
 *     parameters:
 *       - in: parameter
 *         name: EmployeeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     responses:
 *       200:
 *         description: แก้ไขรหัสผ่านเสร็จสิ้นพนักงานเสร็ตสิ้น.
 *       401:
 *         description: ไม่มีสิทธิ์ใช้งาน API .
 *       500:
 *         description: เกิดข้อผิดพลาด
 *
 */
employeeRoute.patch('/editPassword/:id', passport.authenticate('jwt', { session: false }), employeeController.EditPassword)

/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: DeleteEmployee
 *     tags: [Employee Controller]
 *     parameters:
 *       - in: parameter
 *         name: EmployeeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the branch to search for employees.
 *     responses:
 *       200:
 *         description: บล็อคผู้ใช้งานเสร็จสิ้น.
 *       500:
 *         description: Some server error
 *
 */
employeeRoute.delete('/:id', passport.authenticate('jwt', { session: false }), employeeController.DeleteEmployee)

module.exports = employeeRoute

/**
 * @swagger
 * components:
 *   schemas :
 *     AddEmployee:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         tel:
 *           type: string
 *         branchId:
 *            type: int
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - tel
 *         - branchId
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 *     EditEmployee:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         tel:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *         - tel
 *     EditPassword:
 *       type: object
 *       properties:
 *          password:
 *             type: string
 */
