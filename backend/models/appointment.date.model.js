module.exports = (sequelize,DataTypes) => {
    const appointmentDate = sequelize.define("appointmentDate",{
        appointmentId:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        appointDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        isActive:{
            type:DataTypes.STRING(5),
            allowNull:false
        }
    })

    return appointmentDate;
}