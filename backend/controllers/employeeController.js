const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

const searchEmployeeBybranchActive = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const { branchId } = req.params
        const { isActive, role, id } = req.query
        const whereClase = {}


        if (!branchId) {
            return res.status(401).json({ message: "คุณไม่ได้ส่งข้อมูลตามที่ API ขอ" })
        }
        whereClase.branchId = branchId
        if (role) {
            whereClase.role = role
        }
        if (id) {
            whereClase.id = id
        }
        console.log(whereClase)

        const dataEmployee = await employee.findAll({ where: whereClase })
        if (!dataEmployee) {
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

        const { firstName, lastName, email, tel, password, branchId } = req.body
        const dataEmployee = await employee.findAll({
            raw: true, order: [
                ['empCode', 'ASC']
            ]
        })

        if (dataEmployee.length == 0) {
            var empCode = "G0001"
        } else {
            const countEmployee = dataEmployee.length - 1
            const empCodeLast = dataEmployee[countEmployee].empCode
            var empSubS = empCodeLast.slice(1)
            var empSub = parseInt(empSubS, 10)
            empSub = empSub + 1
            var empSubStr = empSub.toString()
            var empCode = "G" + empSubStr.padStart(4, '0')
        }


        const hashPassword = await bcrypt.hash(password, 10)
        const createEmployee = await employee.create({
            empCode: empCode,
            firstName: firstName,
            lastName: lastName,
            email,
            tel,
            password: hashPassword,
            role: "7",
            branchId,
        })

        return res.status(200).json({ message: "create employee successfully" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "error" })
    }
}

const EditEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, tel } = req.body

        if (!firstName || !lastName || !email || !tel) {
            return res.status(405).json({ message: "ข้อมูลไม่ครบตามที่ API ต้องการ" })
        }
        const { id } = req.params

        const dataEmployee = await employee.findOne({ where: { id: id } })

        dataEmployee.set({
            firstName: firstName,
            lastName: lastName,
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
        const { oldPassword, password, confirmPassword } = req.body

        if (!oldPassword || !password || !confirmPassword) {
            return res.status(405).json({ message: "ข้อมูลไม่ครบตามที่ API ต้องการ" })
        }

        const { id } = req.params
        const dataEmployee = await employee.findOne({ where: { id: id } })
        if (!dataEmployee) {
            return res.status(400).json({ message: "ไม่พบผู้ใช้งาน" })
        }
        const checkPassword = await bcrypt.compare(oldPassword, dataEmployee.password)
        console.log(checkPassword)
        if (checkPassword) {
            if (password == confirmPassword) {
                const hashPassword = await bcrypt.hash(password, 10)
                dataEmployee.set({
                    password: hashPassword
                })
                if (await dataEmployee.save()) {
                    return res.status(200).json({ message: "แก้ไขรหัสผ่านเสร็จสิ้น" })
                } else {
                    return res.status(600).json({ message: "แก้ไขไม่ได้" })
                }


            } else {
                res.status(400).json({ message: "รหัสผ่านใหม่ไม่ตรงกัน" })
            }
        } else {
            return res.status(400).json({ message: "รหัสผ่านผ่านเดิมไม่ตรงกัน" })
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
            role: "0"
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
            return res.status(401).json({ message: "Email หรือ Password ไม่ถูกต้อง" })
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password);
        if (!checkPassword) {
            return res.status(401).json("Email หรือ Password ไม่ถูกต้อง");
        }

        const tokenJWT = jwt.sign({
            id: checkEmail.id,
            empCode: checkEmail.empCode,
            role: checkEmail.role
        }, process.env.JWT_SECRET)
        return res.status(200).json({ message: "เข้าสู่ระบบเสร็จสิ้น", token: tokenJWT, role: checkEmail.role })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "ไม่สามารถเข้าสู่ระบบได้" })
    }
}

module.exports = {
    getAllEmployee,
    AddEmployee,
    EditEmployee,
    EditPassword,
    DeleteEmployee,
    Login,
    searchEmployeeBybranchActive,
}