const db = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const patient = db.patient

const addPatient = async (req,res) => {
    try {
        const { peopleCode, //
             firstName,  //
             lastName , //
             isActive , //
             branchId , //JWT
             receivedDate, //
             receivedForm, //
             received, //
             informationProvider, //
             medicalDiagnosis, //
             recentIllness, //
             symptom, //
             congenitalDisease, //JWT
             lastReceived, //
             surgery, //JWT
             familyOfIllness, //JWT
             allergr, //JWT
             consciousnessE, //JWT consciousness
             consciousnessV, //JWT consciousness
             consciousnessM, //JWT consciousness
             skinColor, //JWT
             head, //JWT
             speaking, //JWT
             vision, //JWT
             hearing, //JWT
             oral, //JWT
             breathing, //JWT
             bloodCirculation, //JWT
             stomachAppearance, //JWT
             fertility, //JWT
             otherAbnormalities, //JWT
             behavior, //JWT
             mood, //JWT
             anxious, //JWT
             movement, //JWT
             fallRiskAssesment, //JWT
             sleep, //JWT
             eating, //JWT
             problemEatin, //JWT
             excretion, 
             addictivething, //JWT
             BT, //JWT pulse
             PR, //JWT pulse
             RP, //JWT pulse
             O2SAT, //JWT pulse
             DTX, //JWT pulse
             height,  //
             weigth, //
             patientProblem, //JWT
             birthDay, //JWT
             nationality, //JWT
             maritalStatus, //JWT
             rightToTroatment, //JWT
             address, //JWT
             contactPerson, //JWT
             emergencyHelp, //JWT
             evidence, //JWT
            } = req.body

    const consciousnessJWT = jwt.sign({
        consciousnessE:consciousnessE,
        consciousnessM:consciousnessM,
        consciousnessV:consciousnessV
    },process.env.JWT_SECRET)

    const patientHistoryJWT = jwt.sign({       
        branchId:branchId,
        congenitalDisease:congenitalDisease,
        surgery:surgery,
        familyOfIllness:familyOfIllness,
        allergr:allergr,
        skinColor:skinColor,
        head:head,
        speaking:speaking,
        vision:vision,
        hearing:hearing,
        oral:oral,
        breathing:breathing,
        bloodCirculation:bloodCirculation,
        stomachAppearance:stomachAppearance,
        fertility:fertility,
        otherAbnormalities:otherAbnormalities,
        behavior:behavior,
        mood:mood,
        anxious:anxious,
        movement:movement,
        fallRiskAssesment:fallRiskAssesment,
        sleep:sleep,
        eating:eating,
        problemEatin:problemEatin,
        excretion:excretion,
        addictivething:addictivething,
        patientProblem:patientProblem,
        birthDay:birthDay,
        nationality:nationality,
        maritalStatus:maritalStatus,
        rightToTroatment:rightToTroatment,
        address:address,
        contactPerson:contactPerson,
        emergencyHelp:emergencyHelp,
        evidence:evidence
    },process.env.JWT_SECRET)

    const pulseJWT = jwt.sign({
        BT:BT,
        PR:PR,
        RP:RP,
        O2SAT:O2SAT,
        DTX:DTX
    },process.env.JWT_SECRET)

    const InsertPatient = await patient.create({
        firstName:firstName,
        lastName:lastName,
        peopleCode:peopleCode,
        receivedDate:receivedDate,
        isActive:isActive,
        patientHistory:patientHistoryJWT ,
        receivedForm:receivedForm,
        received:received,
        informationProvider:informationProvider,
        medicalDiagnosis:medicalDiagnosis,
        recentIllness:recentIllness,
        symptom:symptom,
        lastReceived:lastReceived,
        height:height,
        weigth:weigth,
        consciousness:consciousnessJWT,
        pulse:pulseJWT,
    })

    res.status(200).json({message:"เพิ่มผู้ใช้เสร็จสิ้น"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"เกิดข้อผิดพลาด"})
    }

}

module.exports = {
    addPatient
}