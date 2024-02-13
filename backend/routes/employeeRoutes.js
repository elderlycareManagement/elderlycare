const employeeController = require('../controllers/employeeController')
const employeeRoute = require('express').Router()
const passport = require('passport')

/**
 * @openapi
 * tags:
 *   name: Employee
 *   description: Employee Management
 */


/**
 * @openapi
 * /api/employee/getAllEmployee:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "ค้นหาเสร็จสิ้น"
 *               data: [employee1, employee2, ...]
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "ไม่มีสิทธิ์ใช้งาน API นี้"
 *
 *       '500':
 *          description: Internal 500
 *          content:
 *           application/json:
 *             example:
 *               message: "เกิดช้อผิดพลาด"
 */
   employeeRoute.get('/getAllEmployee',passport.authenticate('jwt', { session: false }),employeeController.getAllEmployee)
 /**
 * @openapi
 * /api/employee/getAllEmployee/{id}:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: "ค้นหาเสร็จสิ้น"
 *               data: [employee1, employee2, ...]
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "ไม่มีสิทธิ์ใช้งาน API นี้"
 *
 *       '500':
 *          description: Internal 500
 *          content:
 *           application/json:
 *             example:
 *               message: "เกิดช้อผิดพลาด"
 */
   employeeRoute.get('/getEmployee/:id',passport.authenticate('jwt', { session: false }),employeeController.getEmployeeById)

   /**
    * @swagger
    * /api/employee/getAllEmployee/:branchId:
    *   get:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.get('/getAllEmployee/:branchId',passport.authenticate('jwt', { session: false }),employeeController.getAllEmployeeByBranch)
   /**
    * @swagger
    * /api/employee/getEmployee/role/{role}:
    *   get:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.get('/getEmployee/role/:role',passport.authenticate('jwt', { session: false }),employeeController.getEmployeeByRole)
   /**
    * @swagger
    * /api/employee/searchEmployee/{branchId}:
    *   get:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.get('/searchEmployee/:branchId',passport.authenticate('jwt', { session: false }),employeeController.searchEmployeeBybranchActive)
   /**
    * @swagger
    * /api/employee/addEmployee:
    *   post:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.post('/addEmployee',passport.authenticate('jwt', { session: false }),employeeController.AddEmployee)
   /**
    * @swagger
    * /api/employee/login:
    *   post:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.post('/login',employeeController.Login)
   /**
    * @swagger
    * /api/employee/editEmployee/{id}:
    *   put:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.put('/editEmployee/:id',passport.authenticate('jwt', { session: false }),employeeController.EditEmployee)
   /**
    * @swagger
    * /api/employee/editPassword/{id}:
    *   patch:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.patch('/editPassword/:id',passport.authenticate('jwt', { session: false }),employeeController.EditPassword)
   /**
    * @swagger
    * /api/employee//employee/{id}:
    *   delete:
    *     summary: Retrieve a list of JSONPlaceholder users
    *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
   */
   employeeRoute.delete('/employee/:id',passport.authenticate('jwt', { session: false }),employeeController.DeleteEmployee)

   module.exports = employeeRoute
