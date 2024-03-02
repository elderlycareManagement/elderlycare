module.exports = (sequelize,DataTypes) => {
    const treatmentRecord = sequelize.define("treatmentRecord",{
        patientId : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        treatedDate:{
            type:DataTypes.DATE,
            allowNull:false
        },
        description : {
            type : DataTypes.STRING(500),
            allowNull : false
        },
        treatedBy : {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        treatedAt : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        createdBy : {
            type : DataTypes.STRING(100),
            allowNull:false
        },
        isActive:{
            type: DataTypes.STRING(5),
            allowNull:false
        },
        transferFromId : {
            type : DataTypes.INTEGER,
            allowNull:true
        }
    },{
        uniqueKeys: {
          Items_unique: {
            fields: ['patientId', 'treatedDate']
          }
        }
    })
    return treatmentRecord
}