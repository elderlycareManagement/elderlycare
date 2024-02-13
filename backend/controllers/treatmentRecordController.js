const db = require('../models')

const treatment = db.treatmentRecord

const getAllTreatment = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const dataTreatment = await treatment.findAll();
        return res.status(200).json({message:"ค้นหาข้อมูลเสร็จสิ้น",data:dataTreatment})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const addTreatment = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const { patientId, treatedDate, description, treatedBy, treatedAt, createdBy } = req.body
        const insertTreatment = await treatment.create({
            patientId: patientId,
            treatedDate: treatedDate,
            description: description,
            treatedBy: treatedBy,
            treatedAt: treatedAt,
            createdBy: createdBy
        })
        return res.status(200).json({ message: "เพิ่มการรักษาคนไข้เสร็จสิ้น" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}


module.exports = {
    addTreatment,
    getAllTreatment
}