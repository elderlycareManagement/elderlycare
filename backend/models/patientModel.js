module.exports = (sequelize,DataTypes) => {
    const patient = sequelize.define('patient',{
        firstName:{
            type: DataTypes.STRING(20),
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING(20),
            allowNull:false
        },
        peopleCode:{
            type: DataTypes.STRING(13),
            allowNull:false
        },
        weigth:{
            type:DataTypes.STRING(5),
            allowNull:false
        },
        height:{
            type:DataTypes.STRING(5),
            allowNull:false
        },
        receivedDate:{
            type: DataTypes.DATE,
            allowNull:false
        },
        receivedForm:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        received:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        informationProvider:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        recentIllness:{
            type:DataTypes.STRING(50),
            allowNull:false
        },
        medicalDiagnosis:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        symptom:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        pulse:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        lastReceived:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        consciousness:{
            type:DataTypes.STRING(200),
            allowNull:false
        },
        isActive:{
            type: DataTypes.STRING(5),
            allowNull:false
        },
        patienHistory:{
            type: DataTypes.STRING(200),
            allowNull:false
        },
})
    return patient
}