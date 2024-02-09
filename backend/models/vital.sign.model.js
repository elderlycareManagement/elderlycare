module.exports = (sequelize,DataTypes) =>  {
    const vitalSign = sequelize.define("vitalSign",{
        patientId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        dateTime: {
            type:DataTypes.DATE,
            allowNull:false
        },
        createdBy:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        BP_SYS:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        BP_DIA:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        pulse:{
            type:DataTypes.STRING(20),
            allowNull:false
        },
        weight:{
            type:DataTypes.STRING(10)
        },
        height:{
            type:DataTypes.STRING(5),
            allowNull:false
        },
        o2:{
            type:DataTypes.STRING(10),
            allowNull:false
        },
        glucose:{
            type:DataTypes.STRING(10),
            allowNull:false
        }
    })

    return vitalSign

}