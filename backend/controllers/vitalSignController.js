const db = require('../models')

const vitalSign = db.vitalSign

const getVitalSign = async (req,res) => {
    try {
        if (req.user.role != '2'&& req.user.role != '3') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }

        const {patientId} = req.params
        const dataVitalSign = await vitalSign.findOne({where:{patientId}})
        if(!dataVitalSign){
            return res.status(400).json({message:"ไม่พบข้อมูลสัญญาณชีพ"})
        }

        return res.status(200).json({message:"พบข้อมูลสัญญาณชีพ",data:dataVitalSign})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดช้อผิดพลาดในการดงึข้อมูลสัญญาณชีพ"})
    }
}

const addVitalSign = async (req,res) => {
    try {
        if (req.user.role != '2'&& req.user.role != '3') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const reqData = [
            "dateTime",
            "createdBy",
            "BP_SYS",
            "BP_DIA",
            "pulse",
            "weight",
            "height",
            "o2",
            "glucose"
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }
        const {patientId} = req.params
        const {dateTime,createBy,BP_SYS,BP_DIA,pulse,weight,height,o2,glucose,createdBy} = req.body

        const addVitalSign = await vitalSign.create({
            patientId,
            dateTime,
            BP_SYS,
            BP_DIA,
            pulse,
            createBy,
            weight,
            height,
            o2,
            glucose,
            createdBy
        })
        return res.status(200).json({message:"เพิ่มข้อมูลสัญญาณชีพเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดช้อผิดพลาดในการดงึข้อมูลสัญญาณชีพ"})
    }
}

const editVitalSign = async (req,res) => {
    try {
        if (req.user.role != '2'&& req.user.role != '3') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const reqData = [
            "dateTime",
            "createdBy",
            "BP_SYS",
            "BP_DIA",
            "pulse",
            "weight",
            "height",
            "o2",
            "glucose"
        ];
        const CheckReqData = reqData.every(field => req.body[field] !== undefined)
        if (!CheckReqData) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลทั้งหมด" });
        }

        const {vitalSignId} = req.params
        console.log(vitalSignId)
        const {dateTime,createdBy,BP_SYS,BP_DIA,pulse,weight,height,o2,glucose} = req.body
        const dataVitalSign = await vitalSign.findOne({where:{id:vitalSignId}})
        if(!dataVitalSign){
            return res.status(400).json({message:"ไม่พบข้อมูลที่ต้องการแก้ไข"})
        }
        dataVitalSign.set({
            dateTime,
            BP_SYS,
            BP_DIA,
            pulse,
            createdBy,
            weight,
            height,
            o2,
            glucose
        })
        await dataVitalSign.save()
        return res.status(200).json({message:"แก้ไขข้อมูลสัญญาณชีพเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาดในการแก้ไขข้อมูลสัญญาณชีพ"})
    }
}

const delVital = async (req,res) => {
    try {
        if (req.user.role != '2'&& req.user.role != '3') {
            return res.status(401).json({ message: 'ไม่มีสิทธิ์ใช้งาน API นี้' })
        }
        const {vitalSignId} = req.params
        
        const dataVital = await vitalSign.findOne({where:{id:vitalSignId}})
        if(!dataVital){
            return res.status(400).json({message:"ไม่พบข้อมูลที่ต้องการแก้ไข"})
        }

        await dataVital.destroy()
        return res.status(200).json({message:"ลบข้อมูลเสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }
}

module.exports = {
    getVitalSign,
    addVitalSign,
    editVitalSign,
    delVital
}