const db = require('../models')
const branch = db.branch


const getAllBranch =  async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const dataBranch = await branch.findAll()
        return res.status(200).json({message:"ค้นหาเสร็จสิ้น",data:dataBranch})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

const getBranch = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const {branchId} = req.params
        const dataBranch = await branch.findOne({where:{id:branchId}})
        return res.status(200).json({message:"ค้นหาเสร็จสิ้น",data:dataBranch})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

const addBranch = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {name,address,tel,managerId} = req.body
        const addBranch = await branch.create({
            name,address,tel,managerId
        })
        return res.status(200).json({message:"เพิ่มข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

const editBranch = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const {branchId} = req.params
        const {name,address,tel,managerId} = req.body
        const dataBranch = await branch.findOne({where:{id:branchId}})
        dataBranch.set({
            name,address,tel,managerId
        })
        await dataBranch.save()
        return res.status(200).json({message:"แก้ไขข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

const delBranch = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {branchId} = req.params

        const dataBranch = await branch.findOne({where:{id:branchId}})
        await dataBranch.destroy()
        return res.status(200).json({message:"ลบข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

module.exports = {
    getAllBranch,
    getBranch,
    addBranch,
    editBranch,
    delBranch
}