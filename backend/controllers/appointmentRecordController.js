const { where } = require('sequelize')
const db = require('../models')

const appointmentRecord = db.appointmentRecord
const appointmentDate = db.appointmentDate

const getAllAppoint = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const dataAppoint = await appointmentRecord.findAll()
        return res.status(200).json({message:"ค้นหาข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถเพิ่มข้อมูลได้"})
    }
}

const searchAppoint = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const whereClause = {}
        const {branchId} = req.params
        const {id,doctorId} = req.body
        if(id){
            whereClause.id = id
        }
        if(doctorId){
            whereClause.appointTo = doctorId
        }
        if(branchId){
            whereClause.appointAt = branchId
        }

        const dataAppoint = await appointmentRecord.findAll({where:{whereClause}})
        return res.status(200).json({message:"พบข้อมูล",data:dataAppoint})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถเพิ่มข้อมูลได้"})
    }
    }

const searchAppointDate = async  (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const whereClause = {}
        const {branchId} = req.params
        const {id,appointDate,isActive} = req.body
        if(id){
            whereClause.id = id
        }
        if(appointDate){
            whereClause.appointDate = appointDate
        }
        if(branchId){
            whereClause.appointAt = branchId
        }
        if(isActive){
            whereClause.isActive = isActive
        }

        const dataAppointDate = await appointmentDate.findAll({where:{whereClause}})
        return res.status(200).json({message:"พบข้อมูล",data:dataAppointDate})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถเพิ่มข้อมูลได้"})
    }
}

const addAppointment = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {patientId,description,doctorId,branchId,createId} = req.body

        const addAppointment = appointmentRecord.create({
            patientId:patientId,
            description:description,
            appointTo:doctorId,
            appointAt:branchId,
            createBy:createId
        })

        return res.status(200).json({message:"เพิ่มข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถเพิ่มข้อมูลได้"})
    }
}
const addAppointmentDate = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {appointId} = req.params
        const {appointDate} = req.body

        const addAppointDate = await appointmentDate.create({
            appointDate,
            isActive:"true",
            appointmentId:appointId
        })

        return res.status(200).json({message:"เพิ่ทข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถเพิ่มข้อมูลได้"})
    }
}

const editAppoint = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {appointId} = req.params
        const {description,doctorId,branchId,createId} = req.body
        const dataAppoint = appointmentRecord.findOne({where:{id:appointId}})
        if(!dataAppoint){
            return res.status(400).json({message:"ไม่่พบข้อมูลการนัดหมาย"})
        }
        dataAppoint.set({
            description:description,
            appointTo:doctorId,
            appointAt:branchId,
            createBy:createId
        })
        dataAppoint.save()
        return res.status(200).json({message:"แก้ไขข้อมูลการนัดเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถแก้ไขข้อมูลได้"})
    }
}
const editAppointDate = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {appointId} = req.params
        const {appointDate} = req.body
        const dataAppoint = appointmentDate.findOne({where:{id:appointId}})
        if(!dataAppoint){
            return res.status(400).json({message:"ไม่่พบข้อมูลการนัดหมาย"})
        }
        dataAppoint.set({
            appointDate
        })
        dataAppoint.save()
        return res.status(200).json({message:"แก้ไขข้อมูลการนัดเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด ไม่สามารถแก้ไขข้อมูลได้"})
    }
}

const delAppoint = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {appointId}= req.params
        
        const delAppoint = appointmentRecord.findOne({where:{id:appointId}})
        if(!delAppoint){
            return res.status(400).json({message:"ไม่พบข้อมูลของการนัด"})
        }
        delAppoint.set({
            isActive:"false"
        })
        delAppoint.save()
        return res.status(200).json({message:"ลบข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด เปลี่ยนสถานะได้"})
    }
}


module.exports = {
    addAppointment,
    getAllAppoint,
    searchAppoint,
    searchAppointDate,
    addAppointmentDate,
    editAppoint,
    editAppointDate,
    delAppoint
}