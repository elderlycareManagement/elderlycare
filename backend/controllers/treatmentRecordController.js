const db = require('../models')

const treatment = db.treatmentRecord

const getAllTreatment = async (req, res) => {
    try {
        if (req.user.role != '2'&& req.user.role != '3') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const dataTreatment = await treatment.findAll();
        return res.status(200).json({ message: "ค้นหาข้อมูลเสร็จสิ้น", data: dataTreatment })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const addTreatment = async (req, res) => {
    try {
        if (req.user.role != '3') {
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

const searchTreatment = async (req, res) => {
    try {
        if (req.user.role != '2'&& req.user.role != '3') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const { branchId } = req.params
        const { id, treatedDate, doctorId, patientId } = req.query
        const whereClause = {}
        whereClause.treatedAt = branchId
        if (id) { whereClause.id = id }
        if (treatedDate) { whereClause.treatedDate = treatedDate }
        if (doctorId) { whereClause.treatedBy = doctorId }
        if (patientId) { whereClause.patientId = patientId }
        console.log(whereClause)
        const dataTreatment = await treatment.findAll({ where:  whereClause  })

        return res.status(200).json({ message: "พบข้อมูลที่ค้นหา", data: dataTreatment })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const editTreeatment = async (req, res) => {
    if (req.user.role != '2'&& req.user.role != '3' && req.user.role != '4') {
        return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
    }
    const { treatmentId } = req.params
    const { treatedDate, description, doctorId, treatedAt, createdBy } = req.body
    if(!treatedDate || !description || !doctorId || !treatedAt || !createdBy){
        return res.status(405).json({message:"ข้อมูลไม่ครบตามที่ API ต้องการ"})
    }

    const dataTreatment = await treatment.findOne({ where: { id: treatmentId } })
    if (!dataTreatment) {
        return res.status(400).json({ message: "ไม่พบการรักษาที่จะทำการแก้ไข" })
    }
    dataTreatment.set({
        treatedDate: treatedDate,
        description: description,
        treatedBy: doctorId,
        treatedAt: treatedAt,
        createdBy: createdBy
    })
    dataTreatment.save()
    return res.status(200).json({message:"แก้ไขการรักษาเสร็จสิ้น"})


}
const tranferPatient = async (req,res) => {
    try {
        if(req.user.role != '2'){
            return res.status(401).json({message:"ไม่มีสิทธิ์ใช้งาน API"})
        }

        const {treatmentId,branchId} = req.params
        const dataTreatment = await treatment.findOne({where:{id:treatmentId}})
        if(!dataTreatment){
            return res.status(400).json({message:"ไม่พบข้อมูลผู้ป่วย"})
        }
        dataTreatment.set({
            tranferPatient:branchId
        })
        dataTreatment.save()
        return res.status(200).json({message:"ย้ายผู้ป่วยเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

module.exports = {
    addTreatment,
    getAllTreatment,
    searchTreatment,
    editTreeatment,
    tranferPatient
}