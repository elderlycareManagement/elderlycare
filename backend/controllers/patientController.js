const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { where } = require('sequelize')

const patient = db.patient
const healthEvaluation = db.healthEvaluation
const illnessHistory = db.illnessHistory
const initialArrired = db.initialArrired
const vitalSign = db.vitalSign


const reqDataPateint = async (req,res) => {
    try {
        const {peopleCode} = req.body
        if(!peopleCode){
            return res.status(403).json({message:'ข้อมูลไม่ครบตาม request'})
        }
        const dataPatient = await patient.findOne({where:{peopleCode:peopleCode}})
        if(!dataPatient){
            return res.status(200).json({message:"ไม่พบข้อมูลผู้ป่วย"})
        }
        return res.status(200).json({message:'พบข้อมูล',data:dataPatient})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"เกิดข้อผิดพลาด โปรดเช็คส่งค่าตาม document"})
    }
}

const dataPatient = async (req,res) => {
    try {
        if(req.user.role != '7'){
            return res.status(401).json({message:'ไม่มีสิทธิ์ใช้งาน API นี้'})
        }

        const dataPatient = await patient.findAll()
        res.status(200).json({message:'พบข้อมูลผู้ป่วย',data:dataPatient})
    } catch (error) {
        res.status(500).json({message:'เกิดข้อผิดพลาด'})
    }
}


const addPatient = async (req,res) => {
    try {
        if(req.user.role != '7'){
            return res.status(401).json({message:'ไม่มีสิทธิ์ใช้งาน API นี้'})
        }
        const reqData = [
            'firstName',
            'lastName',
            'peopleCode',
            'receivedDate',
            'recentIllness',
            'medicalDiagnosis',
            'lastReceived',
            'consciousness',
            'isActive',
            'patientHistory'
        ];

        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (CheckReqData) {
            const addPatient = await patient.create({

            })
            res.status(200).json({ message: "เพิ่มผู้ใช้เสร็จสิ้น" });
        } else {
            res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

const delPatient = async (req,res) => {
    try {
        if(req.user.role != '7'){
            return res.status(401).json({message:'ไม่มีสิทธิ์ใช้งาน API นี้'})
        }
        const patientId = req.body

        const findPatient = await patient.findOne({where:{id:patientId}})
        if(!findPatient){
            return res.status(400).json({message:"ไม่พบผู้ป่วยที่จะแก้ไข"})
        }
        findPatient.set({
            isActive:false
        })
        findPatient.save()

        return res.status(200).json({message:"ทำการลบผู้ใช้งานเสร็จสิ้น"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'เกิดข้อผิดพลาด'})
    }
}

module.exports = {
    addPatient,
    reqDataPateint,
    dataPatient,
    delPatient
}