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
        const { patientId, treatedDate, description, doctorId, treatedAt, createdBy } = req.body
        const insertTreatment = await treatment.create({
            patientId: patientId,
            treatedDate: treatedDate,
            description: description,
            treatedBy: doctorId,
            treatedAt: treatedAt,
            createdBy: createdBy
        })
        return res.status(200).json({ message: "เพิ่มการรักษาคนไข้เสร็จสิ้น" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const searchTreatment = async (req,res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const {branchId} = req.params
        const {id,treatedDate,doctorId,patientId} = req.query
        const whereClause = {}
        whereClause.treatedAt = branchId
        if(id){ whereClause.id=id}
        if(treatedDate){ whereClause.treatedDate = treatedDate}
        if(doctorId){ whereClause.treatedBy = doctorId}
        if(patientId){ whereClause.patientId = patientId}

        const dataTreatment = await treatment.findAll({where:{whereClause}})

        return res.status(200).json({message:"พบข้อมูลที่ค้นหา",data:dataTreatment})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const editTreeatment = async (req,res) => {
    if (req.user.role != '7') {
        return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
    }
}

module.exports = {
    addTreatment,
    getAllTreatment,
    searchTreatment,
    editTreeatment
}