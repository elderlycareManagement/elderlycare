const db = require('../models')

const appointmentRecord = db.appointmentRecord

const add_appointmentRecord = async (req,res) => {
    try {
        const {patientId,description,doctorId,branchId,createId} = req.body

        const add = appointmentRecord.create({
            patientId:patientId,
            description:description,
            apointTo:doctorId,
            apointAt:branchId,
            createBy:createId
        })

        return res.status(200).json({message:"เพิ่มข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"ไม่สามารถเพิ่มข้อมูลได้"})
    }
}


module.exports = {
    add_appointmentRecord
}