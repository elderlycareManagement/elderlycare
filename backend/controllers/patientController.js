const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const patient = db.patient
const healthEvaluation = db.healthEvaluation
const illnessHistory = db.illnessHistory
const initialArrired = db.initialArrired
const vitalSign = db.vitalSign

const addPatient = async (req,res) => {
    try {
        const { 
            firstName,
            lastName,
            peopleCode,
            receivedDate,
            recentIllness,
            medicalDiagnosis,
            lastReceived,
            consciousness,
            isActive,
            patientHistory
            } = req.body

            

    res.status(200).json({message:"เพิ่มผู้ใช้เสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }

}

module.exports = {
    addPatient
}