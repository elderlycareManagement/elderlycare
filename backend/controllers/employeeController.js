const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('sequelize')

const employee = db.employee


const getAllEmployee = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const dataEmployee = await employee.findAll()
        return res.status(200).json({ message: "Select success", data: dataEmployee })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "error" })
    }
}

const getEmployeeById = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "คุณไม่ได้ส่งข้อมูลตามที่ API ขอ" })
        }
        const dataEmployee = await employee.findOne({ where: { id: id } })

        if (!dataEmployee) {
            return res.status(400).json({ message: "ไม่พบข้อมูล จาก ID ที่ส่งมา" })
        }

        return res.status(200).json({ message: "ค้นหาข้อมูลเสร็จสิ้น", data: dataEmployee })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const getAllEmployeeByBranch = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const { branchId } = req.params
        if (!branchId) {
            return res.status(400).json({ message: "คุณไม่ได้ส่งข้อมูลตามที่ API ขอ" })
        }

        const dataEmployee = await employee.findAll({ where: { branchIdd: branchId } })
        if (!dataEmployee) {
            return res.status(400).json({ message: "ไม่พบข้อมูล จาก branchId ที่ส่งมา" })
        }
        return res.status(200).json({ message: "ค้นหาข้อมูลเสร็จสิ้น", data: dataEmployee })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const getEmployeeByRole = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const { role } = req.params
        if (!role) {
            return res.status(400).json({ message: "คุณไม่ได้ส่งข้อมูลตามที่ API ขอ" })
        }

        const dataEmployee = await employee.findAll({ where: { role: role } })
        if (!dataEmployee) {
            return res.status(400).json({ message: "ไม่พบข้อมูล จาก branchId ที่ส่งมา" })
        }

        return res.status(200).json({ message: "ค้นหาข้อมูลเสร็จสิ้น", data: dataEmployee })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const searchEmployeeBybranchActive = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const { branchId } = req.params
        const { isActive } = req.query

        if (!branchId || !isActive) {
            return res.status(400).json({ message: "คุณไม่ได้ส่งข้อมูลตามที่ API ขอ" })
        }

        const dataEmployee = await employee.findAll({ where: { branchId:branchId , isActive:isActive } })
        if(!dataEmployee){
            return res.status(400).json({ message: "ไม่พบข้อมูล จาก branchId และ isActive ที่ส่งมา" })
        }

        return res.status(200).json({ message: "ค้นหาข้อมูลเสร็จสิ้น", data: dataEmployee })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const AddEmployee = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const { firstname, lastname, email, tel, password } = req.body
        const dataEmployee = await employee.findAll({
            raw: true, order: [
                ['empCode', 'ASC']
            ]
        })

        // สร้าง empCode ล่าสุด

        const countEmployee = dataEmployee.length - 1
        const empCodeLast = dataEmployee[countEmployee].empCode
        var empSubS = empCodeLast.slice(1)
        var empSub = parseInt(empSubS, 10)
        empSub = empSub + 1
        var empSubStr = empSub.toString()
        const empCode = "G" + empSubStr.padStart(4, '0')
        // ได้ empCode

        const hashPassword = await bcrypt.hash(password, 10)
        const createEmployee = await employee.create({
            empCode: empCode,
            firstName: firstname,
            lastName: lastname,
            email,
            tel,
            password: hashPassword,
            role: "0"
        })

        return res.status(200).json({ message: "create employee successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error" })
    }
}

const EditEmployee = async (req, res) => {
    try {
        const { id, firstname, lastname, email, tel } = req.body

        const dataEmployee = await employee.findOne({ where: { id: id } })

        dataEmployee.set({
            firstname: firstname,
            lastname: lastname,
            email: email,
            tel: tel
        })

        await dataEmployee.save()

        return res.status(200).json({ message: "edit successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error" })
    }
}

const EditPassword = async (req, res) => {
    try {
        const { id, oldPassword, password, confirmPassword } = req.body

        const dataEmployee = await employee.findOne({ where: { id: id } })
        if (!dataEmployee) {
            return res.status(401).json({ message: "ไม่พบผู้ใช้งาน" })
        }
        if (dataEmployee.password === oldPassword) {
            if (password == confirmPassword) {
                dataEmployee.set({
                    password: password
                })
                await dataEmployee.save();
                return res.status(200).json({ message: "แก้ไขรหัวผ่านเสร็จสิ้น" })
            } else {
                res.status(401).json({ message: "รหัสผ่านใหม่ไม่ตรงกัน" })
            }
        } else {
            return res.status(401).json({ message: "รหัสผ่านผ่านเดิมไม่ตรงกัน" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const DeleteEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const findEmployee = await employee.findOne({ where: { id: id } });
        findEmployee.set({
            role: "7"
        })
        findEmployee.save()
        return res.status(200).json({ message: "ลบพนักงานเสร็จสสิ้น" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อิดพลาด" })
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "ไม่ได้ใส่ข้อมูล email หรือ password" })
        }
        const checkEmail = await employee.findOne({ where: { email: email } })
        if (!checkEmail) {
            return res.status(401).json({ message: "Email ไม่ถูกต้อง" })
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password);
        if (!checkPassword) {
            return res.status(401).json("password ไม่ถูกต้อง");
        }

        const tokenJWT = jwt.sign({
            id: checkEmail.id,
            empCode: checkEmail.empCode,
            role: checkEmail.role
        }, process.env.JWT_SECRET)
        return res.status(200).json({ message: "เข้าสู่ระบบเสร็จสิ้น", token: tokenJWT })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "ไม่สามารถเข้าสู่ระบบได้" })
    }
}

module.exports = {
    getAllEmployee,
    getEmployeeById,
    AddEmployee,
    EditEmployee,
    EditPassword,
    DeleteEmployee,
    Login,
    getAllEmployeeByBranch,
    searchEmployeeBybranchActive,
    getEmployeeByRole
}