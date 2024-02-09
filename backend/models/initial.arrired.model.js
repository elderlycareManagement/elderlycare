module.exports = (sequelize,DataTypes) => {
    const initialArrired = sequelize.define("initialArrired",{
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        receivedForm:{
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
        medicalDiagosis:{
            type:DataTypes.STRING(200),
            allowNull:false
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
    return initialArrired
}