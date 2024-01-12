module.exports = (sequelize,DataTypes) => {
    const appointmentRecord = sequelize.define("appointmentRecord",{
        patientId:{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        descpiption:{
            type:DataTypes.STRING(300),
            allowNull:false,
        },
        appointTo:{
            type:DataTypes.INTEGER,

        },
        appointAt:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        createdBy:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    })
    return appointmentRecord
}