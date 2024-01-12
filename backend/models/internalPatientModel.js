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
    },{
        uniqueKeys: {
          Items_unique: {
            fields: ['minor', 'major']
          }
        }
    })

    return internalPatient
}