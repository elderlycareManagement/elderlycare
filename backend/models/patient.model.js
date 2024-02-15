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
        receivedDate:{
            type: DataTypes.DATE,
            allowNull:false
        },
        recentIllness:{
            type:DataTypes.STRING(50),
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
        patientHistory:{
            type: DataTypes.STRING(200),
            allowNull:false
        },
        branchId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
})
    return patient
}