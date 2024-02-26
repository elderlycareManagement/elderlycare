const db = require('../models')

const patient = db.patient
const healthEvaluation = db.healthEvaluation
const illnessHistory = db.illnessHistory
const initialArrived = db.initialArrired
const vitalSign = db.vitalSign


const searchPatient = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const {branchId} = req.params
        const { peopleCode, isActive, id } = req.query
        const whereClause = {};
        whereClause.branchId = branchId

        if (id) {
            whereClause.id = id;
        }
        if (peopleCode) {
            whereClause.peopleCode = peopleCode;
        }
        if (isActive) {
            whereClause.isActive = isActive
        }

        const dataPatient = await patient.findAll({ where: whereClause })
        if (!dataPatient) {
            return res.status(200).json({ message: "ไม่พบข้อมูลผู้ป่วย" })
        }
        return res.status(200).json({ message: 'พบข้อมูล', data: dataPatient })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "เกิดข้อผิดพลาด โปรดเช็คส่งค่าตาม document" })
    }
}

const getAllPatient = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const dataPatient = await patient.findAll()
        res.status(200).json({ message: 'พบข้อมูลผู้ป่วย', data: dataPatient })
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด' })
    }
}

const addPatient = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: "ไม่มีสิทธิ์ใช้งาน API นี้" })
        }

        const {branchId} = req.params;

        const reqData = [
            "firstName",
            "lastName",
            "peopleCode",
            "receivedDate",
            "recentIllness",
            "lastReceived",
            "consciousness",
            "patientHistory"
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }

        const { firstName, lastName, peopleCode, receivedDate, recentIllness, lastReceived, consciousness, patientHistory } = req.body

        const CheckPatient = await patient.findOne({ where: { peopleCode, isActive: "true" } })
        if (CheckPatient) {
            return res.status(400).json({ message: "มีข้อมูลในระบบแล้วโปรดตรวจสอบ" })
        }

        const insertPatient = await patient.create({
            firstName,
            lastName,
            peopleCode,
            receivedDate,
            recentIllness,
            lastReceived,
            consciousness,
            isActive: "true",
            patientHistory,
            branchId
        })
        return res.status(200).json({ message: "เพิ่มผู้ใช้เสร็จสิ้น" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const addPatientInitial = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const reqData = [
            'receivedFrom',
            'received',
            'infoProvider',
            'medicalDiagnosis',
            'currentIllness',
            'symptom'
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }
        const { patientId } = req.params
        const { receivedFrom, received, infoProvider, medicalDiagnosis, currentIllness, symptom } = req.body
        const CheckPatient = await initialArrived.findOne({ where: { patientId: patientId } })
        if (CheckPatient) {
            return res.status(403).json({ message: "มีข้อมูลอยู่แล้วโปรดทำการแก้ไขข้อมูล" })
        }
        console.log(patientId)
        const addPatientInitial = await initialArrived.create({
            patientId: patientId,
            receivedFrom,
            received,
            infoProvider,
            medicalDiagnosis,
            currentIllness,
            symptom
        })
        return res.status(200).json({ message: "เพิ่มข้อมูลเสร็จสิ้น" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const addPatientHealthEvaluation = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const reqData = [
            'CDE',
            'CDV',
            'CDM',
            'skinColor',
            'head',
            'speaking',
            'vision',
            'hearing',
            'oral',
            'breathing',
            'bloodCirculation',
            'stomach',
            'fertility',
            'abnormalities',
            'behavior',
            'mood',
            'anxious',
            'moveMent',
            'FRA',
            'sleep',
            'eat',
            'problemEat',
            'excretion',
            'addictivething',
            'problemPatient'
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }
        const { patientId } = req.params;
        const CheckPatient = await healthEvaluation.findOne({ where: { patientId: patientId } })
        if (CheckPatient) {
            return res.status(403).json({ message: "มีข้อมูลอยู่แล้วโปรดทำการแก้ไขข้อมูล" })
        }
        const {
            CDE, CDV, CDM, skinColor, head, speaking, vision, hearing,
            oral, breathing, bloodCirculation, stomach, fertility, abnormalities,
            behavior, mood, anxious, moveMent, FRA, sleep, eat, problemEat,
            excretion, addictivething, problemPatient
        } = req.body;
        const addPatientHealthEvaluation = await healthEvaluation.create({
            patientId, CDE, CDV, CDM, skinColor, head, speaking, vision, hearing,
            oral, breathing, bloodCirculation, stomach, fertility, abnormalities,
            behavior, mood, anxious, moveMent, FRA, sleep, eat, problemEat,
            excretion, addictivething, problemPatient
        });
        return res.status(200).json({ message: "เพิ่มข้อมูลเสร็จสิ้น" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
}

const addPatientIllnessHistory = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const reqData = [
            'congenitalDisease',
            'lastHospitalTreatment',
            'surgeryHistory',
            'illnessFamilyHistory',
            'allergies'
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }
        const {patientId} = req.params
        const CheckPatient = await illnessHistory.findOne({ where: {patientId} })
        if (CheckPatient) {
            return res.status(400).json({ message: "มีข้อมูลในระบบแล้วโปรดตรวจสอบ" })
        }
        const {
            congenitalDisease,
            lastHospitalTreatment,
            surgeryHistory,
            illnessFamilyHistory,
            allergies
          } = req.body;

          const insertIllness = await illnessHistory.create({
            patientId,
            congenitalDisease,
            lastHospitalTreatment,
            surgeryHistory,
            illnessFamilyHistory,
            allergies
          })
          return res.status(200).json({message:"เพิ่มข้อมูลเสร็ตสิ้น"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })

    }
}

const delPatient = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const {patientId} = req.params

        const findPatient = await patient.findOne({ where: { id: patientId } })
        if (!findPatient) {
            return res.status(400).json({ message: "ไม่พบผู้ป่วยที่จะแก้ไข" })
        }
        findPatient.set({
            isActive: "false"
        })
        findPatient.save()

        return res.status(200).json({ message: "ทำการลบผู้ใช้งานเสร็จสิ้น" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'เกิดข้อผิดพลาด' })
    }
}

const editPatient = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: "ไม่มีสิทธิ์ใช้งาน API นี้" })
        }
        const {patientId} = req.params
        const reqData = [
            "firstName",
            "lastName",
            "peopleCode",
            "receivedDate",
            "recentIllness",
            "lastReceived",
            "consciousness",
            "patientHistory"
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }

        const { firstName, lastName, peopleCode, receivedDate, recentIllness, lastReceived, consciousness, patientHistory } = req.body

        const editPatient = await patient.findOne({ where: { id:patientId} })
        if (!editPatient) {
            return res.status(400).json({ message: "ไม่พบข้อมูลที่ต้องการแก้ไข" })
        }
        editPatient.set({
            firstName,
            lastName,
            peopleCode,
            receivedDate,
            recentIllness,
            lastReceived,
            consciousness,
            patientHistory
        })
        editPatient.save()
        return res.status(200).json({ message: "แก้ไขข้อมูลผู้ใช้เสร็จสิ้น" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
    
}

const editPatientInitial = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: "ไม่มีสิทธิ์ใช้งาน API นี้" })
        }
        const {patientId} = req.params
        const reqData = [
            'receivedFrom',
            'received',
            'infoProvider',
            'medicalDiagnosis',
            'currentIllness',
            'symptom'
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }

        const { receivedFrom, received, infoProvider, medicalDiagnosis, currentIllness, symptom } = req.body

        const editPatient = await initialArrived.findOne({ where: { patientId} })
        if (!editPatient) {
            return res.status(400).json({ message: "ไม่พบข้อมูลที่ต้องการแก้ไข" })
        }
        editPatient.set({
            receivedFrom,
            received,
            infoProvider,
            medicalDiagnosis,
            currentIllness,
            symptom
        })
        editPatient.save()
        return res.status(200).json({ message: "แก้ไขข้อมูลผู้ใช้เสร็จสิ้น" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
    
}

const editPatientHealthEvaluation = async (req, res) => {
    try {
        const reqData = [
            'CDE',
            'CDV',
            'CDM',
            'skinColor',
            'head',
            'speaking',
            'vision',
            'hearing',
            'oral',
            'breathing',
            'bloodCirculation',
            'stomach',
            'fertility',
            'abnormalities',
            'behavior',
            'mood',
            'anxious',
            'moveMent',
            'FRA',
            'sleep',
            'eat',
            'problemEat',
            'excretion',
            'addictivething',
            'problemPatient'
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมดให้ครบตาม request" });
        }
        const { patientId } = req.params;
        const dataPatient = await healthEvaluation.findOne({ where: { patientId: patientId } })
        if (!dataPatient) {
            return res.status(403).json({ message: "ไม่พบข้อมูลผู้ป่วยที่ต้องการแก้ไข" })
        }
        const {
            CDE, CDV, CDM, skinColor, head, speaking, vision, hearing,
            oral, breathing, bloodCirculation, stomach, fertility, abnormalities,
            behavior, mood, anxious, moveMent, FRA, sleep, eat, problemEat,
            excretion, addictivething, problemPatient
        } = req.body;
        dataPatient.set({
            CDE, CDV, CDM, skinColor, head, speaking, vision, hearing,
            oral, breathing, bloodCirculation, stomach, fertility, abnormalities,
            behavior, mood, anxious, moveMent, FRA, sleep, eat, problemEat,
            excretion, addictivething, problemPatient
        });
        dataPatient.save();
        return res.status(200).json({ message: "แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })
    }
    
}

const editPatientIllness = async (req, res) => {
    try {
        if (req.user.role != '7') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const reqData = [
            'congenitalDisease',
            'lastHospitalTreatment',
            'surgeryHistory',
            'illnessFamilyHistory',
            'allergies'
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }
        const {patientId} = req.params
        const dataPatient = await illnessHistory.findOne({ where: {patientId} })
        if (!dataPatient) {
            return res.status(400).json({ message: "ไม่พบข้อมูลผู้ป่วยที่ต้องการแก้ไข" })
        }
        const {
            congenitalDisease,
            lastHospitalTreatment,
            surgeryHistory,
            illnessFamilyHistory,
            allergies
          } = req.body

          dataPatient.set({
            congenitalDisease,
            lastHospitalTreatment,
            surgeryHistory,
            illnessFamilyHistory,
            allergies
          })
          dataPatient.save()
          return res.status(200).json({message:"แก้ไขข้อมูลผู้ป่วยเสร็จสิ้น"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "เกิดข้อผิดพลาด" })

    }
    
}

module.exports = {
    addPatientIllnessHistory,
    addPatientHealthEvaluation,
    addPatient,
    searchPatient,
    getAllPatient,
    delPatient,
    editPatient,
    editPatientInitial,
    editPatientHealthEvaluation,
    editPatientIllness,
    addPatientInitial,
}