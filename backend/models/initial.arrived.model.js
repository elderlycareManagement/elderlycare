module.exports = (sequelize,DataTypes) => {
    const initialArrived = sequelize.define("initialArrived",{
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        receivedFrom:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        received:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        infoProvider:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        medicalDiagnosis:{
            type:DataTypes.STRING(200),
            allowNull:true
        },
        currentIllness:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        symptom:{
            type:DataTypes.STRING(200),
            allowNull:false
        }

    })
    return initialArrived
}