const db = require('../models')
const jwt = require('jsonwebtoken')

const treatement = db.treatmentRecord
const add_treatment = async (req,res) => {
    try {
        
        const {patientId,treatedDate,description,treatedBy,treatedAt,createdBy} = req.body

        const insertTreatment = await treatement.create({
            patientId:patientId,
            treatedDate:treatedDate,
            description:description,
            treatedBy:treatedBy,
            treatedAt:treatedAt,
            createdBy:createdBy
        })

        res.status(200).json({message:"เพิ่มการรักษาคนไข้เสร็จสิ้น"})
    } catch (error) {
        res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}


module.exports = {
    add_treatment
}