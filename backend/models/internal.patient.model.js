module.exports = (sequelize,DataTypes) => {
    const internalPatient = sequelize.define('internalPatient',{
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        receivedDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        dischardedDate:{
            type:DataTypes.DATE,
            allowNull:false
        }
    })

    return internalPatient
}